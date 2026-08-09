import * as Utils from "./utils.ts";
import { io, app } from "./app.ts";
import settings from "./settings.json" with { type: "json" };
import vaultCodes from "./vault.json" with { type: "json" };
import express from "express";
import * as db from "./database.ts";
import type { Socket } from "socket.io";
import type { IncomingHttpHeaders } from "node:http";
import z from "zod";

process.loadEnvFile(".env");

let higherKings = process.env.HIGHER_KINGS!.split(",");
let lowerKings = process.env.LOWER_KINGS!.split(",");

function socketIp(socket: Socket): string {
	if (process.env.USE_X_REAL_IP !== "false") {
		const headers = socket.handshake.headers as IncomingHttpHeaders;
		const ip = headers["x-real-ip"];
		return typeof ip === "string" ? ip : socket.handshake.address;
	}
	return socket.handshake.address;
}

function godwordRunlevel(godword: string): number {
	if (godword === process.env.GODWORD) {
		return 4;
	}
	if (higherKings.includes(godword)) {
		return 3;
	}
	if (lowerKings.includes(godword)) {
		return 2;
	}
	return 0;
}

app.post("/vault", express.json(), async (req, res) => {
	let cookie = req.cookie.token;
	if (!cookie) {
		res.json({ error: "Invalid cookie" });
		return;
	}
	let vaultSchema = z.object({ 
		tag: z.string().optional(), 
		guess: z.string(),
	});
	let vaultBody = vaultSchema.safeParse(req.body);
	if (!vaultBody.success) {
		res.json({ error: "Invalid request body" });
		return;
	}
	const { tag, guess } = vaultBody.data;
	for (let code of vaultCodes.codes) {
		if (code.tag == null || code.tag == tag) {
			if (code.matches == null || new RegExp(code.matches, "i").test(guess)) {
				if (code.unlocks) {
					await db.unlockHat(cookie, code.unlocks);
				}
				res.json({
					message: typeof code.response === "string" ? code.response : code.response.text,
					tag: "tag" in code ? code.tag : null,
					unlock: code.unlocks ?? null,
				});
				return;
			}
		}
	}
	let randomResponse = vaultCodes.randomDialog[Math.floor(Math.random() * vaultCodes.randomDialog.length)];
	res.json({
		message: typeof randomResponse === "string" ? randomResponse : randomResponse.text,
		tag: typeof randomResponse === "string" ? null : randomResponse.tag,
	});
	return;
});

type filter = {
	regex: RegExp;
	replacement: string;
};

let filters: filter[] = [];
for (const [regex, replacement] of Object.entries(settings.filters)) {
	filters.push({
		regex: new RegExp(regex, "gv"),
		replacement,
	});
}

function censor(txt: string) {
	for (let filter of filters) {
		txt = txt.replace(filter.regex, filter.replacement);
	}
	return txt;
}

let rooms = new Map<string, Room>;

export function beat() {
	io.on('connection', function (socket) {
		let q = 0;

		// Ratelimit hack
		/* eslint-disable */
		let onevent = (socket as any).onevent;
		(socket as any).onevent = function (packet: any) {
			let args = packet.data || [];
			onevent.call (this, packet);
			packet.data = ["*"].concat(args);
			onevent.call(this, packet);
		};
		socket.on("*", () => {
			if (q > 45) {
				socket.disconnect();
			}
			q++;
			setTimeout(() => {
				q--;
			}, 1000);
		});
		User.init(socket);
		/* eslink-enable */
	});
};

function checkRoomEmpty(room: Room) {
	if (room.users.length !== 0) return;

	room.deconstruct();
	rooms.delete(room.id);
}

function webhook(name: string, msg: string, color: string) {
	msg = msg.replaceAll("@", "#");
	msg = msg.replace(/(https?:\/\/)?[a-z0-9]{9,}.onion\/?\S*/gi, "(blocked, child porn)");
	msg = msg.replace(/https?:\/\/\S*/gi, "(blocked, link)");
	msg = msg.replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g, "(blocked, ip)");
	let payload = {
		username: name,
		avatar_url: `https://bonzi.gay/discord_pfp/${color.replaceAll(" ", "+")}.png`,
		content: msg,
	};
	fetch(process.env.DISCORD_WEBHOOK!, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)        
	}).catch(() => {});
}

type userPublic = {
	name: string;
	color: string;
	tag?: string;
	pitch: number;
	speed: number;
	typing: string;
};

class Room {
	id: string;
	users: User[];
	owner?: string;

	constructor(roomId: string) {
		this.id = roomId;
		this.users = [];
	}

	deconstruct() {
		this.users.forEach((user) => {
			user.disconnect();
		});
	}

	join(user: User) {
		user.socket.join("#" + this.id);
		this.users.push(user);

		this.updateUser(user);
	}

	leave(user: User) {
		let userIndex = this.users.indexOf(user);

		if (userIndex == -1) return;
		this.users.splice(userIndex, 1);

		checkRoomEmpty(this);
	}

	updateUser(user: User) {
		this.emit('update', {
			guid: user.guid,
			userPublic: user.public,
		});
	}

	getUsersPublic() {
		let usersPublic: Record<string, userPublic> = {};
		this.users.forEach((user) => {
			usersPublic[user.guid] = user.public;
		});
		return usersPublic;
	}

	emit(cmd: string, data: unknown) {
		io.to("#" + this.id).emit(cmd, data);
	}

	findUser(guid: string): User | null {
		let user = this.users.find(u => u.guid === guid);
		return user ?? null;
	}
}

function newRoom(rid: string): Room {
	let room = new Room(rid);
	rooms.set(rid, room);
	return room;
}

let poolId = 1;

let whitelist = ["catbox.moe", "bonzi.gay"];

function findUser(guid: string): User | null {
	for (let room of rooms.values()) {
		let user = room.users.find(u => u.guid === guid);
		if (user) return user;
	}
	return null;
}

function listUsers(): User[] {
	return [...rooms.values()].flatMap(r => r.users);
}

let userCommands: Record<string, string | ((this: User, arg: string, id: string) => unknown)> = {
	"godmode": function (word) {
		if (godlocks.has(word)) return;
		let level = godwordRunlevel(word);
		if (level > 0) {
			this.runlevel = level;
			this.runword = word;
			this.updateAdmin();
		}
	},
	"pgodmode": async function (word) {
		if (godlocks.has(word)) return;
		let level = godwordRunlevel(word);
		if (level > 0) {
			this.runlevel = level;
			this.runword = word;
			this.updateAdmin();
			await db.setGodword(this.cookie, word);
		}
	},
	"logout": async function () {
		if (this.runword) {
			await db.deleteGodword(this.cookie);
			for (const user of listUsers()) {
				if (user.runword === this.runword) {
					user.runlevel = 0;
					user.public.tag = "Logged Out";
					user.room.updateUser(user);
				}
			}
		}
	},
	"godlock": function () {
		if (this.runword) {
			godlocks.add(this.runword);   
			for (const user of listUsers()) {
				if (user.runword === this.runword) {
					user.runlevel = 0;
					user.public.tag = "Godlocked";
					user.room.updateUser(user);
				}
			}
		}
	},
	"p": "poll",
	"joke": function () {
		this.room.emit("joke", {
			guid: this.guid,
			rng: Math.random(),
		});
	},
	"j": "joke",
	"fact": function () {
		this.room.emit("fact", {
			guid: this.guid,
			rng: Math.random(),
		});
	},
	"f": "fact",
	"youtube": function (vidRaw) {
		var vid = vidRaw;
		this.room.emit("youtube", {
			guid: this.guid,
			vid: vid,
		});
	},
	"backflip": function (swag) {
		this.room.emit("backflip", {
			guid: this.guid,
			swag: swag === "swag",
		});
	},
	"linux": "passthrough",
	"pawn": "passthrough",
	"bees": "passthrough",
	"color": function (color) {
		let cols = this.public.color.split(" ");
		if (color) {
			if (settings.bonziColors.indexOf(color) === -1)
				return;

			cols[0] = color;
		} else {
			let bc = settings.bonziColors;
			cols[0] = bc[
				Math.floor(Math.random() * bc.length)
			];
		}

		this.public.color = cols.join(" ");
		this.room.updateUser(this);
	},
	"colour": "color",
	"c": "color",
	"pope": function () {
		this.public.color = "pope";
		this.room.updateUser(this);
	},
	"asshole": function (args) {
		this.room.emit("asshole", {
			guid: this.guid,
			target: args
		});
	},
	"owo": function (args) {
		this.room.emit("owo", {
			guid: this.guid,
			target: args
		});
	},
	"xss": function (args) {
		this.room.emit("xss", {
			guid: this.guid,
			text: args
		});
	},
	"bass": function (args) {
		this.room.emit("bass", {
			guid: this.guid,
			target: args,
		});
	},
	"triggered": "passthrough",
	"name": function (args) {
		if (args.length > settings.nameLimit)
			return;
		let name = args || settings.defaultName;
		this.public.name = name;
		this.room.updateUser(this);
	},
	"pitch": function (input) {
		let pitch = parseInt(input);

		if (isNaN(pitch)) return;

		this.public.pitch = Math.max(
			Math.min(
				pitch,
				settings.pitch.max
			),
			settings.pitch.min
		);

		this.room.updateUser(this);
	},
	"speed": function (input) {
		let speed = parseInt(input);

		if (isNaN(speed)) return;

		this.public.speed = Math.max(
			Math.min(
				speed,
				settings.speed.max
			),
			settings.speed.min
		);

		this.room.updateUser(this);
	},
	"poll": function (args) {
		this.room.emit("poll", {
			guid: this.guid,
			poll: poolId++,
			title: args,
			options: ["Yes", "No"],
		});
	},
	"advpoll": function (args) {
		let parts = [""];
		for (let i = 0; i < args.length; i++) {
			if (args[i] === "\\" && i + 1 < args.length) {
				parts[parts.length - 1] += args[i + 1];
				i++;
			} else if (args[i] === ";") {
				parts.push("");
			} else {
				parts[parts.length - 1] += args[i];
			}
		}
		parts = parts.map(p => p.trim());
		let title = parts[0];
		let options = parts.slice(1);
		options[0] ??= "Yes";
		options[1] ??= "No";
		if (options.length < 2 || options.length > 5) return;
		this.room.emit("poll", {
			guid: this.guid,
			poll: poolId++,
			title: title,
			options: options,
		});
	},
	"french": function (args) {
		this.room.emit("french", {
			guid: this.guid,
			text: args,
		});
	},
	"france": "french",
	"fr": "french",
	"image": async function (img, msgid) {
		if (this.restrict === "images") {
			this.socket.emit("xss", {
				guid: this.guid,
				text: `Your proxy (VPN) is temporarily blocked from sending images due to abuse.<br><small>Only you can see this.</small>`
			});
			return;
		}

		let url = new URL(img);

		let reason = await db.getImageBlockReason(img);

		if (reason) {
			this.socket.emit("xss", {
				guid: this.guid,
				text: `This image been blacklisted due to: <i>${reason}</i><br><small>Only you can see this.</small>`
			});
			return;
		}

		if (whitelist.some(x => url.host.endsWith(x))) {
			if (decodeURIComponent(img).toLowerCase().includes("svg")) return;
			this.room.emit("image", {
				guid: this.guid,
				url: img,
				msgid: msgid,
			});
		} else {
			this.room.emit("talk", {
				guid: this.guid,
				text: "catbox.moe urls only",
			});
		}
	},
	"video": async function (img, msgid) {
		let url = new URL(img);
		if (this.restrict === "images") {
			this.socket.emit("xss", {
				guid: this.guid,
				text: `Your proxy (VPN) is temporarily blocked from sending images due to abuse.<br><small>Only you can see this.</small>`
			});
			return;
		}
		let reason = await db.getImageBlockReason(img);
		if (reason) {
			this.socket.emit("xss", {
				guid: this.guid,
				text: `This video been blacklisted due to: <i>${reason}</i><br><small>Only you can see this.</small>`
			});
			return;
		}
		if (whitelist.some(x => url.host.endsWith(x))) {
			this.room.emit("video", {
				guid: this.guid,
				url: img,
				msgid: msgid,
			});
		} else {
			this.room.emit("talk", {
				guid: this.guid,
				text: "catbox.moe urls only",
			})
		}
	},
	"i": "image",
	"img": "image",
	"ban": async function (id) {
		let user = findUser(id);
		if (!user) return;
		user.socket.emit("ban", { reason: "Spambotting" });
		let ip = user.getIp();
		bans.add(user.getIp());
		for (const user of listUsers()) {
			if (user.getIp() === ip) {
				user.socket.emit("ban", { reason: "Spambotting" });
				user.disconnect();
			}
		}
		let ids = await db.getMessageIdsFromIp(this.getIp());
		if (ids.length) {
			this.room.emit("delete", { ids });
		}
	},
	"unban": function (ip) {
		bans.delete(ip);
	},
	"kick": function (text) {
		let [id, ...reasonArr] = text.split(" ");
		let reason = reasonArr.join(" ");
		let user = findUser(id);
		if (!user) return;
		user.socket.emit("kick", { reason });
		user.disconnect();
	},
	"debug:afk": function () {
		let reason = "You have been disconnected for being inactive for 20 minutes.";
		this.socket.emit("kick2", { reason });
		this.disconnect();
	},
	"info": function (id) {
		let user = findUser(id);
		if (!user) return;
		this.notify(user.getIp());
	},
	"hat": async function (input) {
		let hatList = input.split(" ");
		hatList[0] ||= settings.hats[Math.floor(Math.random() * settings.hats.length)];
		let limit = 1;
		let hats = settings.hats;
		if (this.runlevel >= 1) {
			limit = 3;
			hats = [...hats, ...settings.blessedHats];
			if (this.runlevel >= 2) { 
				hats = [...hats, "king", "headphones2", "scarf2", "redcrown", "diamondchain", "silverchain"];
				limit = 10;
			}
		}
		if (hatList[0].toLowerCase() === "none") {
			this.public.color = this.public.color.split(" ")[0];
		} else {
			let f = "";
			for (let hat of hatList) {
				if (hats.includes(hat)) {
					f += " " + hat;
				}
				if (settings.vaultHats.includes(hat)) {
					let hasHat = await db.hasHat(this.cookie, hat);
					if (hasHat) {
						f += " " + hat;
					}
				}
				if (f.replace(/[^ ]/g, "").length >= limit) {
					break;
				}
			}
			this.public.color = this.public.color.split(" ")[0] + f;
		}
		this.room.updateUser(this);
	},
	"masskick": function (text) {
		let [type, ...argsArr] = text.split(" ");
		let args = argsArr.join(" ");
		let reason = "Botnet";
		let targets = [];

		if (type === "all") {
			reason = args || reason;
			targets = this.room.users.filter(u => u.guid !== this.guid && u.runlevel < 2);
		} else if (type === "name") {
			let [name, ...rArr] = args.split(" ");
			reason = rArr.join(" ") || reason;
			targets = this.room.users.filter(u => u.guid !== this.guid && u.runlevel < 2 && u.public.name === name);
		} else if (type === "regex") {
			let [regexStr, ...rArr] = args.split(" ");
			reason = rArr.join(" ") || reason;
			try {
				let regex = new RegExp(regexStr, "i");
				targets = this.room.users.filter(u => u.guid !== this.guid && u.runlevel < 2 && regex.test(u.public.name));
			} catch (e) {
				return this.notify("Invalid regex.");
			}
		} else {
			return;
		}

		targets.forEach(u => {
			u.socket.emit("kick", { reason });
			u.disconnect();
		});

		this.notify(`Kicked ${targets.length} user${targets.length !== 1 ? "s" : ""}.`);
	},
	"captcha": async function(data) {
		try {
			if (data !== "on" && data !== "off") return this.notify("usage: /captcha [on|off]");
			let on = data === "on";
			await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE}/settings/security_level`, {
				method: "PATCH",
				headers: {
					"Authorization": `Bearer ${process.env.CLOUDFLARE_KEY}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ value: on ? "under_attack" : "medium" }),
			});
			this.notify(`Captcha is now ${on ? "on" : "off"}.`);
		} catch(e) {
			this.notify(String(e));
		}
	},
	"h": "hat",

	"bless": function (id) {
		let user = findUser(id);
		if (!user) return;
		user.runlevel = 1;
		user.public.color = "blessed";
		user.public.tag = "Blessed";
		user.room.updateUser(user);
		user.socket.emit("blessed");
	},
	"angel": function () {
		this.public.color = "blessed";
		this.room.updateUser(this);
	},
	"noob": function () {
		this.public.color = "noob";
		this.room.updateUser(this);
	},
	"glow": function () {
		this.public.color = "glow";
		this.room.updateUser(this);
	},
	"gold": function () {
		this.public.color = "gold";
		this.room.updateUser(this);
	},
	"dank": function () {
		if (this.public.color.indexOf(" ") === -1) this.public.color += " ";
		this.public.color = this.public.color.split(" ").with(1, "dank").join(" ");
		this.room.updateUser(this);
	},
	"tempban": async function(text) {
		let [time, id, ...reasonArr] = text.split(" ");
		let reason = reasonArr.join(" ");
		let duration = time === "long" ? 60000 * 60 : 60000 * 5;
		let user = findUser(id);
		if (!user) return;
		user.socket.emit("ban", { reason: "Temp banned for 5 minutess" });
		let ip = user.getIp();
		tempBans.set(ip, { reason, end: Date.now() + duration });
		setInterval(() => {
			tempBans.delete(user.getIp());
		}, duration);
		for (const user of listUsers()) {
			if (user.getIp() === ip) {
				user.socket.emit("ban", { reason, end: Date.now() + duration });
				user.disconnect();
			}
		}
		let ids = await db.getMessageIdsFromIp(ip);
		if (ids.length) {
			this.room.emit("delete", { ids });
		}
	},
	"nuke": function(id) {
		let user = findUser(id);
		if (!user) return;
		user.socket.emit("nuked");
		this.room.emit("nuke", { guid: user.guid });
		setTimeout(() => {
			user.socket.disconnect();
		}, 10000);
	},
	"nameedit": function(args) {
		let [id, ...a] = args.split(" ");
		let name = a.join(" ");
		let user = findUser(id);
		if (!user) return;
		user.public.name = name.slice(0, 100);
		user.room.updateUser(user);
	},
	"tagedit": function(args) {
		let [id, ...a] = args.split(" ");
		let tag = a.join(" ");
		let user = findUser(id);
		if (!user) return;
		user.public.tag = tag.slice(0, 100);
		user.room.updateUser(user);
	},
	"tag": function(args) {
		this.public.tag = args;
		this.room.updateUser(this);
	},
	"delete": function(msgid) {
		this.room.emit("delete", { ids: [msgid] });
	},
	"banmsg": async function(msgid) {
		/*
			let ip = (await ipGrabQuery.get(+msgid)).ip;
			tempBans.set(ip, { end: Date.now() + 60000 * 5, reason: "Temp ban for 5 minutes" });
			setInterval(() => {
				tempBans.delete(ip);
			}, 60000 * 5);
			for (const user of Object.values(rooms).flatMap(room => room.users)) {
				if (user.getIp() === ip) {
					user.socket.emit("ban", { end: Date.now() + 60000 * 5, reason: "Temp ban for 5 minutes" });
					user.disconnect();
				}
			}
		*/
	},
	"shush": function (id) {
		let user = findUser(id);
		if (!user) return;
		this.room.emit("talk", { guid: user.guid, text: "." });
	},
	"banimg": async function (text) {
		let [img, ...reasonArr] = text.split(" ");
		let reason = reasonArr.join(" ") || "Moderator did not put a description.";
		await db.blockImage(img, reason);
	},
	"unbanimg": async function (img) {
		await db.unblockImage(img);
	},
	"announce": function (text) {
		this.room.emit("alert", {
			title: `Announcement from ${this.public.name}`,
			text: text,
		});
	}
};

function connections(ip: string) {
	return listUsers()
		.filter(user => user.getIp() === ip)
		.length;
}

let recentlyJoined: Record<string, number> = {};
let bans = new Set<string>;
let tempBans = new Map<string, { reason: string, end: number }>;
let godlocks = new Set<string>;

type UserOptions = {
	runlevel: number,
	socket: Socket,
	userPublic: userPublic,
	room: Room,
	databaseId: string,
	guid: string,
	cookie: string,
	headers: string,
};

type TalkOptions = {
	text: string;
	quote?: {
		text: string;
		name: string;
	};
}

class User {
	guid: string;
	antispam: number;
	socket: Socket;
	lastMsg: string;
	lastActive: number;
	repeatCount: number;
	cookie: string;
	idleTimer: NodeJS.Timeout;
	headers: string;
	runlevel: number;
	runword?: string;
	restrict?: string;
	databaseId: string;
	public: userPublic;
	room: Room;

	constructor({ runlevel, socket, userPublic, room, databaseId, guid, cookie, headers }: UserOptions) {
		this.guid = guid;
		this.socket = socket;
		this.antispam = 0;
		this.repeatCount = 0;
		this.lastMsg = "";
		this.lastActive = Date.now();
		this.room = room;
		this.public = userPublic;
		this.cookie = cookie;
		this.headers = headers;
		this.runlevel = runlevel;
		this.databaseId = databaseId;

		this.idleTimer = setInterval(() => {
			if (Date.now() - this.lastActive >= 1200000) {
				this.socket.emit("kick2", { reason: "You have been disconnected for being inactive for 20 minutes." });
				this.socket.disconnect(true);
			}
		}, 60000);
		
		if (bans.has(this.getIp())) {
			this.socket.emit("ban", { reason: "Spambotting" });
			this.socket.disconnect();
		}
		
		if (tempBans.has(this.getIp())) {
			let ban = tempBans.get(this.getIp())!;
			this.socket.emit("ban", { reason: ban.reason, end: ban.end });
			this.socket.disconnect();
		}
	}

	static async init(socket: Socket): Promise<User | void> {
		let ip = socketIp(socket);
		let restrict = "";
		let banInfo = await db.blockInfo(ip);
		if (banInfo) {
			if(banInfo.type === "block") {
				socket.emit("ban", { reason: banInfo.reason });
				socket.disconnect();
				return;
			} else {
				restrict = banInfo.type;
			}
		}
		return new Promise(async (resolve) => {
			socket.once("login", async (data) => {
				let loginSchema = z.object({
					room: z.string(),
					name: z.string(),
				});
				let loginResult = loginSchema.safeParse(data);
				if (!loginResult.success) {
					resolve();
					return;
				}
				let user = await User.login(socket, loginResult.data);
				resolve(user);
			});
		});
	};

	getIp() {
		return socketIp(this.socket);
	}

	async log(type: string, data: string): Promise<string> {
		let messageId = db.logMessage(this.databaseId, this.public.name, type, data);
		return messageId;
	}

	static async login(socket: Socket, data: { name: string; room: string }): Promise<User | void> {
		let ip = socketIp(socket);
		if (connections(ip) >= 3) {
			socket.emit("loginFail", {
				reason: "You have too many connections.",
			});
			return;
		}
		if (recentlyJoined[ip] >= 2) {
			socket.emit("loginFail", {
				reason: "You have too many connections.",
			});
			return;
		}
		recentlyJoined[ip] ??= 0;
		recentlyJoined[ip]++;
		setTimeout(() => {
			recentlyJoined[ip]--;
		}, 10000);

		let guid = Utils.guidGen();

		if (data.room === "") data.room = "default";
		data.room = censor(data.room);
		let runlevel = data.room === "default" ? 0 : 1;
		if (!rooms.has(data.room)) {
			let room = newRoom(data.room);
			if (data.room !== "default") {
				room.owner = guid;
			}
		}
		let room = rooms.get(data.room)!;
		
		let name = censor(data.name || "Anonymous");
		if (name.length > settings.nameLimit) {
			socket.emit("loginFail", {
				reason: "Name too long.",
			});
			return;
		}

		let userPublic = {
			name: name,
			color: settings.bonziColors[Math.floor(Math.random() * settings.bonziColors.length)],
			speed: Utils.randomInt(settings.speed.min, settings.speed.max),
			pitch: Utils.randomInt(settings.pitch.min, settings.pitch.max),
			tag: "",
			typing: "",
		};

		const cookieHeader = socket.handshake.headers.cookie;
		let cookie = "";
		if (cookieHeader) {
			cookieHeader.split(";").forEach((c: string) => {
				const [key, value] = c.trim().split("=");
				if (key === "token") cookie = value;
			});
		}

		let headers = Object.entries(socket.handshake.headers).map(n => `${n[0]}: ${n[1]}`).join("\r\n");

		if (!cookie) {
			socket.emit("loginFail", {
				reason: "You don't have a cookie. Please reload, this shouldn't happen.",
			})
			return;
		}

		let databaseId = await db.logJoin(ip, data.name, guid, cookie, headers);

		let godword = await db.getGodword(cookie);
		
		if (godword) {
			let newLevel = godwordRunlevel(godword);
			if (newLevel > runlevel) runlevel = newLevel;
		}

		let user = new User({
			socket,
			runlevel,
			room,
			databaseId,
			guid,
			userPublic,
			cookie,
			headers,
		});

		let hats = await db.getUnlockedHats(cookie);

		socket.emit("room", {
			room: data.room,
			isOwner: room.owner === guid,
			isPublic: data.room === "default",
			you: guid,
			unlocks: hats,
			vaultHats: settings.vaultHats,
		});

		socket.emit("updateAll", {
			usersPublic: room.getUsersPublic(),
		});

		user.updateAdmin();
		
		room.join(user);

		socket.on("talk", (data) => {
			let schema = z.object({
				text: z.string(),
				quote: z.object({
					name: z.string(),
					text: z.string(),
				}).optional(),
			})
			let result = schema.safeParse(data);
			if (result.success) user.talk(result.data);
		});

		socket.on("command", (data) => {
			let schema = z.object({
				command: z.string(),
				args: z.string(),
			});
			let result = schema.safeParse(data);
			if (!result.success) return;
			
			user.command(result.data).catch(() => {});
		});

		socket.on("disconnect", () => {
			user.disconnect();
		});

		socket.on("vote", (data) => {
			if (!data) return;
			if (typeof data !== "object") return;
			if (typeof data.poll !== "number") return;
			room.emit("vote", {
				guid: guid,
				poll: data.poll,
				vote: data.vote,
			});
		});

		socket.on("typing", (data) => {
			user.lastActive = Date.now();
			if (data) {
				user.public.typing = "typing";
			} else {
				user.public.typing = "";
			}
			room.updateUser(user);
		});

		return user;
	}

	async talk(data: TalkOptions) {
		this.lastActive = Date.now();
		if (data.quote) {
			if (typeof data.quote !== "object") return;
			if (typeof data.quote.name !== "string") return;
			if (typeof data.quote.text !== "string") return;
			if (data.quote.text.length > settings.charLimit) return;
			if (data.quote.name.length > settings.nameLimit) return;
			data.quote = {
				name: censor(data.quote.name),
				text: censor(data.quote.text),
			};
		}
		
		if (this.runlevel === 0) {
			let tooManyRepeats =
				data.text.slice(0, 10) === this.lastMsg.slice(0, 10) ||
				data.text.slice(-10, Infinity) === this.lastMsg.slice(-10, Infinity);
			
			if (tooManyRepeats) {
				this.repeatCount++;
				if (this.repeatCount >= 3) {
					return;
				}
			} else {
				this.repeatCount = 0;
			};
			
			this.lastMsg = data.text;
			if (this.antispam >= 5) return;
			this.antispam++;
			setTimeout(() => {
				this.antispam--;
			}, 5000);
		}
		
		let text = censor(data.text);
		let msgid = await this.log("text", data.text);
		if (text.length <= settings.charLimit && text.length > 0) {
			this.room.emit('talk', {
				guid: this.guid,
				text: text,
				msgid: msgid,
				quote: data.quote,
			});
			if(this.room.id === "default") {
				webhook(this.public.name, text, this.public.color);
			}
		}
	}

	async command(data: { command: string, args: string }) {
		this.lastActive = Date.now();

		try {
			let command = data.command.toLowerCase();
			let args = censor(data.args);
			if (args.length > 1000) return;
			let messageId = await this.log("command", `/${command} ${args}`);
			if (this.antispam >= 5) return;
			this.antispam++;
			setTimeout(() => {
				this.antispam--;
			}, command === "hat" || command == "color" ? 1000 : 5000);
			
			if (!userCommands.hasOwnProperty(command)) return;

			let commandLevel = (settings.runlevel as Record<string, number>)[command] || 0;
			if (this.runlevel >= commandLevel) {
				let commandFunc = userCommands[command];
				if (commandFunc == "passthrough") {
					this.room.emit(command, {
						"guid": this.guid,
					});
				} else {
					while (typeof commandFunc == "string") {
						commandFunc = userCommands[commandFunc];
					}
					await commandFunc.call(this, args, messageId);
				}
			} else {
				this.socket.emit("commandFail", {
					reason: "runlevel"
				});
			}
		} catch (e) {
			this.socket.emit("commandFail", {
				reason: "unknown",
			});
		}
	}

	notify(text: string) {
		this.socket.emit("alert", {
			title: "Alert",
			text: text.replaceAll("<", "&lt;").replaceAll("&", "&amp;")
		});
	}

	updateAdmin() {
		if (this.runlevel === 2) {
			this.socket.emit("king");
		} else if (this.runlevel > 2) {
			this.socket.emit("admin");
		}
	}

	disconnect() {
		clearTimeout(this.idleTimer);
		this.socket.broadcast.emit("leave", {
			guid: this.guid,
		});

		this.log("leave", "");

		this.room.leave(this);
		this.socket.disconnect(true);
	}
}
