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

CREATE Table orderBy(
    id serial PRIMARY KEY UNIQUE,
    name Varchar(255) UNIQUE
);

CREATE Table orders(
    id serial PRIMARY KEY,
    orderId Integer REFERENCES orderBy(id),
    orderName Varchar(255) REFERENCES OrderBy(name),
    name text,
    minus text,
    plus text,
    totalprice Integer,
    time Integer
);



