import type { NextFunction, Request, Response } from "express";

// GUID generator (okay not actually GUID compliant but whatever)
// http://stackoverflow.com/a/105074
export function guidGen(): string {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	};

	let id = '';
	for (let i = 0; i < 4; i++)
		id += s4();
	return id;
}


// http://stackoverflow.com/a/1527820
export function randomInt(min: number, max: number): number {
	return Math.floor(((max - min + 1) * Math.random()) + min);
};

export function sanitizeUnicode(str: string) {
	if (!str) return str;
	const REPLACEMENT = "\uFFFD";
	let out = "";

	for (let i = 0; i < str.length; i++) {
	const code = str.charCodeAt(i);
	
	if (code === 0) {
		out += REPLACEMENT;
		continue;
	}

	if (code >= 0xD800 && code <= 0xDBFF) {
		const next = str.charCodeAt(i + 1);
		if (!(next >= 0xDC00 && next <= 0xDFFF)) {
			out += REPLACEMENT;
		} else {
			out += str[i] + str[i + 1];
			i++;
		}
		continue;
	}

	if (code >= 0xDC00 && code <= 0xDFFF) {
		out += REPLACEMENT;
		continue;
	}

	out += str[i];
	}
	
	return out;
}

declare module "express-serve-static-core" {
	interface Request {
		// can't overwrite "cookies" because express.js declares it as "any"
		// mild hack but its fine we won't be using express forever
		cookie: Record<string, string | undefined>;
	}
}

export function cookieParser(req: Request, res: Response, next: NextFunction) {
	if (!req.headers.cookie) {
		req.cookie = {};
		next();
		return;
	}
	let cookie = req.headers.cookie;
	let cookies: Record<string, string> = {};
	let keypairs = cookie.split("; ");
	for (let keypair of keypairs) {
		let equalPos = keypair.indexOf("=");
		let key = keypair.slice(0, equalPos);
		let val = decodeURIComponent(keypair.slice(equalPos + 1));
		cookies[key] = val;
	}
	req.cookie = cookies;
	next();
}