require('dotenv').config();
const { Client } = require('pg');
const xss = require('xss');

const connectionString = process.env.DATABASE_URL;



//inserting food into the database, always used when insert-data.js runs
async function saveFood(data) {
    const client = new Client({ connectionString });
    const {
      name,
      contains,
      description,
      price,
      time,
    } = data;

    const bname = xss(name);
    const bcontains = xss(contains);
    const bdescription = xss(description);
    const bprice = xss(price);
    const btime = xss(time);


  
    await client.connect();
  
    const query =
    `INSERT INTO food(name, contains, description, price, time) VALUES($1, $2, $3, $4, $5) returning *`;
  
    const values = [
      bname, bcontains, bdescription, price, time
    ];
  
    try {
      const result = await client.query(query, values);
      const { rows } = result;
      return rows;
    } catch (err) {
      console.error('Error inserting data');
      throw err;
    } finally {
      await client.end();
    }
}


//inserting food into the database, always used when insert-data.js runs
async function saveOffers(data) {
  const client = new Client({ connectionString });
  const {
    name,
    contains,
    sauce,
    description,
    price,
    time,
  } = data;

  const bname = xss(name);
  const bcontains = xss(contains);
  const bsauce = xss(sauce);
  const bdescription = xss(description);
  const bprice = xss(price);
  const btime = xss(time);



  await client.connect();

  const query =
  `INSERT INTO offers(name, contains, sauce, description, price, time) VALUES($1, $2, $3, $4, $5, $6) returning *`;

  const values = [
    bname, bcontains, bsauce, bdescription, price, btime
  ];

  try {
    const result = await client.query(query, values);
    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error inserting data');
    throw err;
  } finally {
    await client.end();
  }
}


async function saveSauces(data) {
  const client = new Client({ connectionString });
  const {
    name,
    price,
  } = data;

  const bname = xss(name);




  await client.connect();

  const query =
  `INSERT INTO sauces(name, price) VALUES($1, $2) returning *`;

  const values = [
    bname, price
  ];

  try {
    const result = await client.query(query, values);
    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error inserting data');
    throw err;
  } finally {
    await client.end();
  }
}


async function insertMaterialsIn(data) {
  const client = new Client({ connectionString });
  const {
    foodId,
    foodName,
    materialId,
    materialName,
  } = data;



  await client.connect();

  const query =
  `INSERT INTO materialIn(foodId, foodName, materialId, materialName) VALUES($1, $2, $3, $4) returning *`;

  const values = [
    foodId, foodName, materialId, materialName
  ];
  try {
    const result = await client.query(query, values);
    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error inserting data');
    throw err;
  } finally {
    await client.end();
  }
}



async function insertFoodInOffers(data) {
  const client = new Client({ connectionString });
  const {
    offerId,
    offerName,
    foodId,
    foodName,
  } = data;



  await client.connect();

  const query =
  `INSERT INTO foodInOffer(offerId, offerName, foodId, foodName) VALUES($1, $2, $3, $4) returning *`;

  const values = [
    offerId, offerName, foodId, foodName
  ];
  try {
    const result = await client.query(query, values);
    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error inserting data');
    throw err;
  } finally {
    await client.end();
  }
}


//inserting materials into the database, alwas used when insert-data.js runs.
async function saveMaterials(data) {
  const client = new Client({ connectionString });
  const {
    material,
    price,
  } = data;

  const bmaterial = xss(material);
  const bprice = xss(price);



  await client.connect();

  const query =
  `INSERT INTO materials(material, price) VALUES($1, $2) returning *`;

  const values = [
    bmaterial,
    price
  ];

  try {
    const result = await client.query(query, values);
    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error inserting data');
    throw err;
  } finally {
    await client.end();
  }
}


//creating a new order, you can create order with for example postman, see orderFood.js

/* TODO:
  Impliment the front end so you can send in a new order
*/
async function addOrder(data) {
  const client = new Client({ connectionString });
  const {
    orderId,
    itemId,
    offerName,
    orderName,
    foodName,
    minus,
    plus,
    price,
    totalprice,
    totalTime,
  } = data;


  await client.connect();

  const query =
  `INSERT INTO orders(orderId, itemId, offerName, orderName, foodName, minus, plus, price, totalprice, totalTime) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`;

  const values = [
    orderId, itemId, offerName, orderName, foodName, minus, plus, price, totalprice, totalTime
  ];


  try {
    const result = await client.query(query, values);
    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error inserting data');
    throw err;
  } finally {
    await client.end();
  }
}

//get Price of each material
async function getMaterialPrice(material){
  const client = new Client({ connectionString});
  const query = 'SELECT price FROM materials WHERE material = $1';
  await client.connect();

  try{
    const data = await client.query(query, [material]);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }
}



//get Price of each food
async function getFoodPrice(food){
  const client = new Client({ connectionString});
  const query = 'SELECT price FROM food WHERE name = $1';
  await client.connect();

  try{
    const data = await client.query(query, [food]);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }
}


//get Price of each offer
async function getOfferPrice(offer){
  const client = new Client({ connectionString});
  const query = 'SELECT price FROM offers WHERE name = $1';
  await client.connect();

  try{
    const data = await client.query(query, [offer]);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }
}

//get highest order id
async function getHighestId(){
  const client = new Client({ connectionString });
  const query = 'SELECT max(orderId) FROM orders';
  await client.connect();

  try{
    const data = await client.query(query);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }
}


//get All food on the menu
async function getFood(){
  const client = new Client({ connectionString });
  const query = 'SELECT * FROM food';
  await client.connect();

  try{
    const data = await client.query(query,null);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }

}



//get all Orders

async function getOrders(){
  const client = new Client({ connectionString });
  const query = `SELECT * FROM orders`;
  await client.connect();

  try{
    const data = await client.query(query,null);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }

}



//get all offers from the menu

async function getOffers(){
  const client = new Client({ connectionString });
  const query = `SELECT * FROM Offers `;
  await client.connect();

  try{
    const data = await client.query(query,null);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }

}


async function getOfferItem(name){
  const client = new Client({ connectionString });
  const query = `SELECT * FROM offers WHERE name = $1`;
  await client.connect();

  try{
    const data = await client.query(query,[name]);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }

}


//get all burgers from the menu
async function getBurgers(){
  const client = new Client({ connectionString });
  const query = `SELECT * FROM food WHERE name like '%borgari' `;
  await client.connect();

  try{
    const data = await client.query(query,null);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }

}


//get all boats from the menu
async function getBoats(){
  const client = new Client({ connectionString });
  const query = `SELECT * FROM food WHERE name like '%bátur' `;
  await client.connect();

  try{
    const data = await client.query(query,null);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }

}


//get all sandwiches from the menu
async function getSandwiches(){
  const client = new Client({ connectionString });
  const query = `SELECT * FROM food WHERE name like '%amloka' `;
  await client.connect();

  try{
    const data = await client.query(query,null);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }

}


//get all materials from the menu
async function getMaterials(){
  const client = new Client({ connectionString });
  const query = `SELECT * FROM materials`;
  await client.connect();

  try{
    const data = await client.query(query,null);
    const { rows } = data;
    (rows);
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }

}



async function getFoodFromOffer(offerId){

  const client = new Client({ connectionString });
  const query = `SELECT foodName,foodId FROM foodInOffer WHERE offerId = $1`;

  await client.connect();

  try{
    const data = await client.query(query,[offerId]);
    const { rows } = data;
    (rows);
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }
}


async function getMaterialsForFood(foodId){
  const client = new Client({ connectionString });
  const query = `SELECT materialName FROM materialIn WHERE foodId = $1`;

  await client.connect();

  try{
    const data = await client.query(query,[foodId]);
    const { rows } = data;
    return rows;
  } catch (err) {
    console.info(err);
    throw err;
  } finally {
    await client.end();
  }
}








module.exports = {
    saveFood,
    saveOffers,
    saveMaterials,
    addOrder,
    getMaterialPrice,
    getFoodPrice,
    getHighestId,
    getFood,
    getOffers,
    getBurgers,
    getBoats,
    getSandwiches,
    getMaterials,
    getOrders,
    insertMaterialsIn,
    insertFoodInOffers,
    saveSauces,
    getOfferPrice,
    getMaterialsForFood,
    getFoodFromOffer,
    getOfferItem
};


