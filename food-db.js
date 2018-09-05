require('dotenv').config();
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;


async function saveFood(data) {
    const client = new Client({ connectionString });
    const {
      name,
      description,
      price,
      time,
    } = data;
  
    await client.connect();
  
    const query =
      'INSERT INTO food(name, description, price, time) VALUES($1, $2, $3, $4) returning *';
  
    const values = [
        name, description, price, time
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
};


