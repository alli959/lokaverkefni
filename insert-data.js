const csv = require('csvtojson');
const xss = require('xss');
const csvFilePath = './data/food.csv';

const {
    saveFood,
} = require('./food-db');

const food = [];

async function insert() {
    for (let i = 0; i < food.length; i++) {
      await saveFood(food[i]); // eslint-disable-line
    }
    console.info('Finished inserting data');
  }

function readJson(){
    csv()
        .fromFile(csvFilePath)
        .on('json', (jsonObj) => {
            const {
                name,
                description,
                price,
                time,
            } = jsonObj;

            const data = {
                name: xss(name),
                description: xss(description),
                price: xss(price),
                time: xss(time),
            };

            food.push(data);
        })
        .on('done', async () => {
            console.info('Finished reading data');
            await insert();
        });

}

csv()
.on('done', () => {
    console.info('Finished creating categories');
    setTimeout(readJson, 2000);
  });

