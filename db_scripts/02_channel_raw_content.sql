CREATE TABLE IF NOT EXISTS channel_raw_content (
    id serial,

    release_date varchar NOT NULL,
    created_date_time bigint NOT NULL,
    channel_id varchar REFERENCES channels(id),
    content text NOT NULL,

    PRIMARY KEY ("id"),
    UNIQUE ("channel_id", "release_date")
);