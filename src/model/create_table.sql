CREATE TABLE tbl_consume (
    id    SERIAL PRIMARY KEY,
    kind  TEXT NOT NULL,
    price INTEGER NOT NULL,
    consume_time TIMESTAMPTZ NOT NULL DEFAULT now(),
    insert_time TIMESTAMPZ NOT NULL DEFAULT now()
);
CREATE INDEX ON tbl_consume(kind);
CREATE INDEX ON tbl_consume(consume_time);
CREATE INDEX ON tbl_consume(insert_time);


CREATE TABLE tbl_schedule (
    id     SERIAL PRIMARY KEY,
    title  TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '', 
    schedule_time TIMESTAMPZ NOT NULL,
    insert_time TIMESTAMPZ NOT NULL DEFAULT now()
);
CREATE INDEX ON tbl_schedule (title);
CREATE INDEX ON tbl_schedule (schedule_time);
