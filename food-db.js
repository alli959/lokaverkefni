require('dotenv').config();
const { Client } = require('pg');
const xss = require('xss');

const connectionString = process.env.DATABASE_URL;

console.log(connectionString);


//Food insert
async function saveFood(data) {
    const client = new Client({ connectionString });
    const {
      name,
      description,
      price,
      time,
    } = data;

    const bname = xss(name);
    const bdescription = xss(description);
    const bprice = xss(price);
    const btime = xss(time);


  
    await client.connect();
  
    const query =
    `INSERT INTO food(name, description, price, time) VALUES($1, $2, $3, $4) returning *`;
  
    const values = [
      bname, bdescription, bprice, btime
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


//Material insert
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


//order creation
async function addOrder(data) {
  const client = new Client({ connectionString });
  const {
    orderId,
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
  `INSERT INTO orders(orderId, orderName, foodName, minus, plus, price, totalprice, totalTime) VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;

  const values = [
    orderId, orderName, foodName, minus, plus, price, totalprice, totalTime
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
  console.log(material);

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

//get Price of food
async function getFoodPrice(food){
  const client = new Client({ connectionString});
  const query = 'SELECT price FROM food WHERE name = $1';
  await client.connect();
  console.log(food);

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







module.exports = {
    saveFood,
    saveMaterials,
    addOrder,
    getMaterialPrice,
    getFoodPrice,
    getHighestId,
};


