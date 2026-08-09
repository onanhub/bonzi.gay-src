CREATE TABLE user_joins (
	id bigserial PRIMARY KEY,
	time timestamp NOT NULL DEFAULT now(),
	ip inet NOT NULL,
	name text NOT NULL,
	guid text NOT NULL,
	cookie text NOT NULL,
	headers text NOT NULL
);

CREATE TYPE log_type AS ENUM ('text', 'command', 'join', 'leave');

CREATE TABLE message_logs (
	id bigserial PRIMARY KEY,
	time timestamp NOT NULL DEFAULT now(),
	user_id bigint REFERENCES user_joins(id),
	name TEXT NOT NULL,
	type log_type NOT NULL CHECK (type <> 'join'),
	data TEXT
);

CREATE VIEW logs AS
	SELECT
		id, time, name, ip, cookie, headers, guid,
		'join'::log_type AS type,
		NULL AS data
	FROM user_joins j

	UNION ALL SELECT
		m.id,
		m.time,
		m.name,
		j.ip,
		j.cookie,
		j.headers,
		j.guid,
		m.type,
		m.data
	FROM message_logs m
	JOIN user_joins j ON m.user_id = j.id;

CREATE INDEX user_joins_time_idx ON user_joins (time);
CREATE INDEX user_joins_name_idx ON user_joins (name);
CREATE INDEX user_joins_cookie_idx ON user_joins (cookie);
CREATE INDEX user_joins_ip_idx ON user_joins USING gist (ip inet_ops);
CREATE INDEX message_logs_time_idx ON message_logs (time);
CREATE INDEX message_logs_name_idx ON message_logs (name);

CREATE TYPE ip_block_type AS ENUM ('flag', 'images', 'block');

CREATE TABLE ip_blocks (
	id bigserial PRIMARY KEY,
	name text NOT NULL,
	type ip_block_type NOT NULL,
	reason text NOT NULL
);

CREATE TABLE ip_block_cidrs (
	id bigserial PRIMARY KEY,
	ip_range cidr NOT NULL,
	block bigint REFERENCES ip_blocks(id) ON DELETE CASCADE
);

CREATE VIEW ip_block_view AS
	SELECT b.id, b.name, b.type, b.reason, c.ip_range
	FROM ip_blocks b JOIN ip_block_cidrs c
	ON b.id = c.block;

CREATE INDEX ip_blocks_cidrs_ip_range_idx ON ip_block_cidrs USING gist (ip_range inet_ops);

CREATE TABLE blocked_images (
    id bigserial PRIMARY KEY,
    image text NOT NULL UNIQUE,
    reason text NOT NULL
);

CREATE PROCEDURE block_ip(ips TEXT, name TEXT, type ip_block_type, reason TEXT)
LANGUAGE plpgsql
AS $$
DECLARE
	block_id bigint;
	ip_text text;
BEGIN
	INSERT INTO ip_blocks (name, type, reason)
		VALUES (name, type, reason)
		RETURNING id INTO block_id;

	FOREACH ip_text IN ARRAY REGEXP_SPLIT_TO_ARRAY(ips, E'(\\r?\\n|,)') LOOP
		IF ip_text <> '' THEN
			INSERT INTO ip_block_cidrs (ip_range, block) VALUES (ip_text::cidr, block_id);
		END IF;
	END LOOP;
END
$$;

CREATE TABLE admin_logins (
	id bigserial PRIMARY KEY,
	cookie text NOT NULL UNIQUE,
	godword text NOT NULL
);

CREATE TABLE unlocked_hats (
	id bigserial PRIMARY KEY,
	cookie text NOT NULL,
	hat text NOT NULL,
	UNIQUE (cookie, hat)
);

CREATE INDEX unlocked_hats_cookie_idx ON unlocked_hats (cookie);
