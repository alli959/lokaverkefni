CREATE Table food(
    id serial PRIMARY KEY,
    name Varchar(255),
    description text,
    price Integer,
    time Integer
);


CREATE Table materials(
    id serial PRIMARY KEY,
    material Varchar(255),
    price Integer
);
