CREATE TABLE tbl_consume (
    id    SERIAL PRIMARY KEY,
    kind  TEXT NOT NULL,
    price INTEGER NOT NULL,
    consume_time TIMESTAMP NOT NULL DEFAULT now(),
    insert_time TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX ON tbl_consume(kind);
CREATE INDEX ON tbl_consume(consume_time);
CREATE INDEX ON tbl_consume(insert_time);
