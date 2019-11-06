//Create database in postgres from schema.sql
//always needs to be run before using this project.

require('dotenv').config();

const fs = require('fs');
const util = require('util');
const { runQuery } = require('./miscellaneous-db');


const readFileAsync = util.promisify(fs.readFile);
const schemaFile = './schema.sql';


async function create() {
  const data = await readFileAsync(schemaFile);
  await runQuery('DROP TABLE IF EXISTS food cascade');
  await runQuery('DROP TABLE IF EXISTS sauces cascade');
  await runQuery('DROP TABLE IF EXISTS offers cascade');
  await runQuery('DROP TABLE IF EXISTS materials cascade');
  await runQuery('DROP TABLE IF EXISTS orders cascade');
  await runQuery('DROP TABLE IF EXISTS materialin cascade');
  await runQuery('DROP TABLE IF EXISTS foodInOffer cascade');

  await runQuery(data.toString('utf-8'));

  console.info('Schema created');
}

create().catch((err) => {
  console.error('Error creating schema', err);
});