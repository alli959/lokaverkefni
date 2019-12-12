const csv = require('csvtojson');
const xss = require('xss');
const csvFilePath = './data/food.csv';
const jsonFilePath = require('./data/food.json');


const {
    saveFood,
    saveMaterials,
    insertMaterialsIn,
    getMaterials,
    getFood,
    saveOffers,
    insertFoodInOffers,
    saveSauces
} = require('./food-db');

const food = [];


async function foodInOffers() {
  const offers = jsonFilePath.offers;
  const foods = jsonFilePath.food;
  for (let i = 0; i < offers.length; i+= 1){
    const foodInOffer = offers[i].contains.split(',');
    for(let j = 0; j < foods.length; j++){
      for(let k = 0; k<foodInOffer.length; k++){
        const inOffer = foodInOffer[k];
        const food = foods[j].name;
        if(inOffer === food){
          try{
            await insertFoodInOffers({

              offerId: i+1,
              offerName: offers[i].name,
              foodId: j+1,
              foodName: food,
            
            });
          } catch(err) {
            console.error("Error comparing food to offers");
            throw err;
          }
        }
      }
    }

  }
  console.info("finished comparing food to offers")
}


async function insertMaterialsInFood() {
  const materials = jsonFilePath.materials;
  const food = jsonFilePath.food;
  for (let i = 0; i < food.length; i+= 1){
    const materialsInFood = food[i].contains.split(',');
    for(let j = 0; j < materials.length; j++){
      for(let k = 0; k<materialsInFood.length; k++){
        const inFood = materialsInFood[k];
        const material = materials[j].material;
        if(inFood === material){
          try{
            await insertMaterialsIn({

              foodId: i+1,
              foodName: food[i].name,
              materialId: j+1,
              materialName: material,
            
            });
          } catch(err) {
            console.error("Error comparing materials to food");
            throw err;
          }
        }
      }
    }

  }
  console.info("finished comparing food to materials");
  foodInOffers();
}


async function insertOffers() {
  const offers = jsonFilePath.offers;
  for (let i = 0; i < offers.length; i += 1) {
    try{
      await saveOffers(offers[i]); // eslint-disable-line
    } catch(err){
      console.error("Error inserting offers", offers[i].sauce);
      throw err;
    }
  }
    console.info('Finished inserting offers');
    insertMaterialsInFood();
  }


  async function insertSauces() {
    const sauces = jsonFilePath.sauces;
    console.log(sauces);
    for (let i = 0; i < sauces.length; i += 1) {
      try{
        await saveSauces(sauces[i]); // eslint-disable-line
      } catch(err){
        console.error("Error inserting Sauces");
        throw err;
      }
    }
      console.info('Finished inserting Sauces');
      insertOffers();
    }





//always need to run this after running createdb.js
//importand to insert the food data into the database, data from ./data/food.json
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
    insertSauces();
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





