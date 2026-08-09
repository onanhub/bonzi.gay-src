import * as fs from "node:fs";
import path from "node:path";
import express from "express";
import sharp from "sharp";
import { cookieParser, guidGen } from "./utils.ts";
import { beat } from "./server.ts";
import { app, io, server } from "./app.ts";
import settings from "./settings.json" with { type: "json" };

export { app, io };

app.use(cookieParser);

app.use("/*.rss", (_req, res, next) => {
	res.setHeader("Content-Type", "application/xml; charset=UTF-8");
	next();
});

app.use((req, res, next) => {
	const randomToken = req.cookie.token ?? guidGen();
	res.cookie("token", randomToken, {
		maxAge: 31488000000,
		httpOnly: true,
		path: "/",
	});
	next();
});

app.use(express.static('../build/www'));

app.get("/discord_pfp/:layers", async (req, res) => {
	try {
		let names = req.params.layers.slice(0, -4).split("+");

		if (names.length > 10) {
			return res.status(404).send("too much");
		}

		let imagePaths = names.map(n => path.join("../src/www/img/pfp", `${n}.webp`));

		for (let p of imagePaths) {
			if (!fs.existsSync(p)) {
				return res.status(404).send(`Layer not found: ${path.basename(p)}`);
			} 
		}

		let base = sharp(imagePaths[0]);

		let overlays = imagePaths.slice(1).map(p => ({ input: p }));

		let result = await base
			.composite(overlays)
			.png()
			.toBuffer();

		res.set("Content-Type", "image/png");
		res.send(result);

	} catch (err) {
		console.error(err);
		res.status(500).send("Error generating image");
	}
});

export let port = Number(process.env.PORT || settings.port);

app.use((_req, res, next) => {
	res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
	res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
	next();
});

app.use(express.static("../client/src"));

beat();

server.listen(port, "127.0.0.1", () => console.log("hi"));
