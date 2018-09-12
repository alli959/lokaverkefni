const csv = require('csvtojson');
const xss = require('xss');
const csvFilePath = './data/food.csv';
const jsonFilePath = require('./data/food.json');


const {
    saveFood,
    saveMaterials,
} = require('./food-db');

const food = [];




async function insertFood() {
  const food = jsonFilePath.food;
  for (let i = 0; i < food.length; i += 1) {
    try{
      await saveFood(food[i]); // eslint-disable-line
    } catch(err){
      console.error("Error inserting food");
      throw err;
    }
  }
    console.info('Finished inserting food');
  }

  async function insertMaterials() {
    const materials = jsonFilePath.materials;
    for(let i = 0; i<materials.length; i += 1) {
      try{
        await saveMaterials(materials[i]);
      }catch(err){
        console.error("Error inserting materials");
        throw err;
      }
    }
    console.info('Finished inserting materials');
    insertFood();
  }


setTimeout(insertMaterials,2000);





