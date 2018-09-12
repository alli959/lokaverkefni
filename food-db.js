require('dotenv').config();
const { Client } = require('pg');
const xss = require('xss');

const connectionString = process.env.DATABASE_URL;

console.log(connectionString);

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

module.exports = {
    saveFood,
    saveMaterials,
};


