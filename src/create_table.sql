CREATE tbl_consume (
    kind  TEXT PRIMARY KEY,
    price INTEGER NOT NULL,
    insert_date TIMESTAMP NOT NULL DEFAULT now(),
);
