const {
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
} = require('./food-db');
const xss = require('xss');


const validator = require('validator');

/**
 * Validation of a new order
 *
 * @param {Object} order - order object to add
 * @param {int} order.orderId - Id of the person who orders
 * @param {String} order.orderName - name of the person who orders
 * @param {Array} order.name - name of the order
 * @param {Array} order.minus - items the person doesn't want
 * @param {Array} order.plus  - items the person wants extra
 * @param {Array} order.price  - price of each item
 * @param {int} order.totalprice - total price of the order
 * @param {int} order.time - time it takes to do the order
 *
 * @returns {Promise} Promise representing a array of errors objects, empty if no errors
 */







/**
 * Add order
 * 
 * @param {Object} order - order object to add
 * @param {Int} order.orderId - ID of the person who orders
 * @param {String} order.orderName - name of the person who orders
 * @param {Array} order.name - name of the order
 * @param {Array} order.minus - items the person doesn't want
 * @param {Array} order.plus  - items the person wants extra
 * @param {Int} order.totalTime - time it takes to do the order
 * 
 * @returns {Promise}
 */

 async function newOrder({
     orderName,
     foodName,
     minus,
     plus,
     totalTime,
 } = {}) {
     console.log("validation here");

     
    const tempId = await getHighestId();
    const id = tempId[0].max + 1;
    const arr = [];

    let totalPrice = 0;
    for(let i = 0; i<foodName.length; i++){
        let materialPrice = 0;
        if(plus[i] === undefined){
            materialPrice = 0;
        }
        else{
            const materials = await plus[i].split(',');

            for(let j = 0; j<materials.length; j++){
                const temp = await getMaterialPrice(materials[j])
                materialPrice += temp[0].price;
                if(materialPrice == undefined){
                    materialPrice = 0;
                }
            }
        }


        const foodPrice = await getFoodPrice(foodName[i]);
        console.log("foodPrice", foodPrice);
        const foodmaterialPrice = materialPrice + foodPrice[0].price;
        console.log(foodmaterialPrice);
        totalPrice += foodmaterialPrice;
        const data = {
            orderId: id,
            orderName: xss(orderName),
            foodName: xss(foodName[i]),
            minus: xss(minus[i]),
            plus: xss(plus[i]),
            price: foodmaterialPrice,
            totalprice: totalPrice,
            totalTime: totalTime,
        };
        await arr.push(data);
    }
    for (let i = 0; i < arr.length; i += 1) {
        try{
        await addOrder(arr[i]); // eslint-disable-line
        } catch(err){
        console.error("Error inserting order");
        throw err;
        }
    }
    console.info('Finished inserting order');

    return ({ status: 200, output: arr });
  
}

/**
 * get food
 * 
 * @returns {promise}
 */

 async function getallFood(){
     const data = await getFood();
     return data;
}


/**
 * get offer
 * 
 * @returns {promise}
 */
async function getOffer(){
    const data = await getOffers();
    return data;

}

/**
 * get Burger
 * 
 * @returns {promise}
 */

 async function getBurger(){
     const data = await getBurgers();
     return data;
 }


 /**
 * get Boat
 * 
 * @returns {promise}
 */

async function getBoat(){
    const data = await getBoats();
    return data;
}



 /**
 * get Sandwich
 * 
 * @returns {promise}
 */

async function getSandwich(){
    const data = await getSandwiches();
    return data;
}

 /**
 * get Materials
 * 
 * @returns {promise}
 */

async function getMaterial(){
    const data = await getMaterials();
    return data;
}

/**
 * show api
 * 
 * @returns {promise}
 */

 async function apiInfo(){
     const data = {
        "method":{
            "GET":{
                "/":{
                    "returns":{
                        "": "api-info"
                    }
                } ,
                "/food":{
                    "returns type: array of all-food": {
                        "id": "id",
                        "name": "String",
                        "isoffer": "boolean",
                        "description": "String",
                        "price": "Int",
                        "time": "Int"
                    }
                },
                "/offers":{
                    "returns type: array of offers": {
                        "id": "id",
                        "name": "String",
                        "isoffer": "boolean",
                        "description": "String",
                        "price": "Int",
                        "time": "Int"
                    }
                },
                "/burgers":{
                    "returns type: array of burgers": {
                        "id": "id",
                        "name": "String",
                        "isoffer": "boolean",
                        "description": "String",
                        "price": "Int",
                        "time": "Int"
                    }
                },
                "/boats":{
                    "returns type: array of boats": {
                        "id": "id",
                        "name": "String",
                        "isoffer": "boolean",
                        "description": "String",
                        "price": "Int",
                        "time": "Int"
                    }
                },
                "/sandwiches":{
                    "returns type: array of sandwiches": {
                        "id": "id",
                        "name": "String",
                        "isoffer": "boolean",
                        "description": "String",
                        "price": "Int",
                        "time": "Int"
                    }
                },
                "/materials":{
                    "returns type: Array of materials": {
                        "id": "id",
                        "material": "String",
                        "price": "Int"
                    }
                }

            },

            "Post":{
                "/orders":{
                    "body":{
                        "orderName": "String",
                        "foodName": "String",
                        "minus": "Array of Strings",
                        "plus": "Array of Strings",
                        "totalTime": "Int"
                    },
                    "returns":{
                        "orderName": "String",
                        "foodName": "String",
                        "minus": "Array of Strings",
                        "plus": "Array of Strings",
                        "totalTime": "Int"
                    }
                    
                }
            }
        }

     }
     return data;
 }





module.exports = {
    newOrder,
    getallFood,
    getOffer,
    getBurger,
    getBoat,
    getSandwich,
    getMaterial,
    apiInfo,
};
 

 

