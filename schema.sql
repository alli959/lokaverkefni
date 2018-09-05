CREATE Table food(
    id serial PRIMARY KEY,
    name Varchar(255),
    description text,
    price Integer UNIQUE,
    time Integer
);

