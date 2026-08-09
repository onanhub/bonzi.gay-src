import pg from "pg";
import { sanitizeUnicode } from "./utils.ts";

process.loadEnvFile(".env");

const client = new pg.Client({
	host: process.env.PG_URL,
	port: 5432,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: "bonziworld",
});

await client.connect();

// Needed as imgbb matches any subdirectory (for some reason)
function urlFilename(url: string): string {
	try {
		return decodeURIComponent(new URL(url).pathname).replace(/^.+\//, "/");
	} catch {
		return "-1";
	}
}

export async function getUnlockedHats(cookie: string): Promise<string[]> {
	let result = await client.query<{ hat: string }>(`
		SELECT hat FROM unlocked_hats WHERE cookie = $1;
	`, [sanitizeUnicode(cookie)]);
	return result.rows.map(row => row.hat);
}

export async function hasHat(cookie: string, hat: string): Promise<boolean> {
	let result = await client.query<{ "?column?": number }>(`
		SELECT 1 FROM unlocked_hats
		WHERE $1 = cookie
		AND hat = $2
	`, [sanitizeUnicode(cookie), hat]);
	return result.rowCount === 1;
}

export async function unlockHat(cookie: string, hat: string): Promise<void> {
	await client.query(`
		INSERT INTO unlocked_hats (cookie, hat)
		VALUES ($1, $2)
		ON CONFLICT DO NOTHING
	`, [sanitizeUnicode(cookie), hat]);
}

export async function setGodword(cookie: string, godword: string): Promise<void> {
	await client.query(`
		INSERT INTO admin_logins (cookie, godword)
		VALUES ($1, $2) ON CONFLICT (cookie) DO UPDATE
		SET godword = excluded.godword
	`, [sanitizeUnicode(cookie), godword]);
}

export async function deleteGodword(cookie: string): Promise<void> {
	await client.query(`
		DELETE FROM admin_logins
		WHERE godword = $1    
	`, [sanitizeUnicode(cookie)]);
}

export async function getImageBlockReason(url: string): Promise<string | null> {
	let res = await client.query<{ reason: string }>(`
		SELECT reason FROM blocked_images
		WHERE $1 = image
	`, [sanitizeUnicode(urlFilename(url))]);
	let row = res.rows[0];
	return row?.reason ?? null;
}

export async function blockImage(url: string, reason: string) {
	await client.query(`
		INSERT INTO blocked_images (image, reason)
		VALUES ($1, $2)
		ON CONFLICT (image) DO UPDATE SET reason = EXCLUDED.reason
	`, [sanitizeUnicode(urlFilename(url)), sanitizeUnicode(reason)]);
}

export async function unblockImage(url: string): Promise<void> {
	await client.query(`
		DELETE FROM blocked_images WHERE image = $1
	`, [sanitizeUnicode(urlFilename(url))]);
}

export async function getMessageIdsFromIp(ip: string): Promise<string[]> {
	let result = await client.query<{ id: string }>(`
		SELECT id FROM logs
		WHERE ip = $1
		AND time >= NOW() - INTERVAL '5 minutes'
		LIMIT 50
	`, [ip]);
	return result.rows.map(row => row.id);
}

export type BlockInfo = {
	type: string;
	reason: string;
};

export async function blockInfo(ip: string): Promise<BlockInfo | null> {
	let result = await client.query<BlockInfo>(`
		SELECT type, reason FROM ip_block_view
		WHERE $1::inet <<= ip_range
		ORDER BY type DESC
		LIMIT 1
	`, [ip]);
	let row = result.rows[0];

	if (row) {
		return {
			type: row.type,
			reason: row.reason,
		};
	}
	return null;
}

export async function logJoin(ip: string, name: string, guid: string, cookie: string, headers: string): Promise<string> {
	let result = await client.query<{ id: string }>(`
		INSERT INTO user_joins (ip, name, guid, cookie, headers)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id;
	`, [ip, sanitizeUnicode(name), guid, sanitizeUnicode(cookie), sanitizeUnicode(headers)]);
	let row = result.rows[0];
	return row.id;
}

export async function logMessage(databaseId: string, name: string, type: string, data: string): Promise<string> {
	let result = await client.query<{ id: string }>(`
		INSERT INTO message_logs (user_id, name, type, data)
		VALUES ($1, $2, $3::log_type, $4)
		RETURNING id;
	`, [databaseId, sanitizeUnicode(name), type, sanitizeUnicode(data)]);
	let messageId = result.rows[0].id;
	return messageId;
}

export async function getGodword(cookie: string): Promise<string | null> {
	let result = await client.query<{ godword: string }>(`
		SELECT godword FROM admin_logins WHERE cookie = $1
	`, [cookie]);
	let row = result.rows[0];
	return row?.godword ?? null;
}
