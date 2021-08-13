CREATE TABLE tbl_consume (
    id    SERIAL PRIMARY KEY,
    kind  TEXT NOT NULL,
    price INTEGER NOT NULL,
    insert_date TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX ON tbl_consume(kind);
CREATE INDEX ON tbl_consume(insert_date);
