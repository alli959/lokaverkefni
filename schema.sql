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


CREATE Table orders(
    id serial PRIMARY KEY,
    orderId Integer,
    orderName Varchar(255),
    foodName Varchar(255),
    minus Varchar(255),
    plus Varchar(255),
    totalprice Integer,
    time Integer
);



