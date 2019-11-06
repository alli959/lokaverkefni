CREATE Table food(
    id serial PRIMARY KEY,
    name Varchar(255),
    contains text,
    description text,
    price Integer,
    time Integer
);

CREATE Table sauces(
    id serial PRIMARY KEY,
    name Varchar(255) Unique,
    price Integer
);


CREATE Table offers(
    id serial PRIMARY KEY,
    name Varchar(255),
    contains text,
    sauce Varchar(255) REFERENCES sauces(name),
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
    itemId Integer,
    offerName Varchar(255),
    orderName Varchar(255),
    foodName Varchar(255),
    minus Varchar(255),
    plus Varchar(255),
    price Integer,
    totalprice Integer,
    totalTime Integer
);



CREATE Table materialIn(
    id serial,
    foodId Integer REFERENCES food(id),
    foodName varchar(255),
    materialId Integer REFERENCES materials(id),
    materialName varchar(255)
);


CREATE Table foodInOffer(
    id serial,
    offerId Integer REFERENCES offers(id),
    offerName Varchar(255),
    foodId Integer REFERENCES food(id),
    foodName varchar(255)
);



