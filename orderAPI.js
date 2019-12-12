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
    getOrders,
    getOfferPrice,
    getMaterialsForFood,
    getFoodFromOffer,
    getOfferItem
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
 * @param {Array} order.offerName - name of the order if it is a offer
 * @param {Array} order.name - name of the order
 * @param {Array} order.minus - items the person doesn't want
 * @param {Array} order.plus  - items the person wants extra
 * @param {Int} order.totalTime - time it takes to do the order
 * 
 * @returns {Promise}
 */

 async function newOrder({
     orderName,
     offerName,
     foodName,
     minus,
     plus,
     totalTime,
 } = {}) {
     console.log("validation here");

     for(var i = 0; i<offerName.length; i++){
         console.log("before",plus[i])
         if(offerName[i] === ""){
             offerName[i] = "NONE";
         }
         if(foodName[i] === ""){
             foodName[i] = "NONE";
         }
         if(minus[i] === ""){
            minus[i] = "NONE";
         }
         if(plus[i] === ""){
            plus[i] = "NONE";
         }

         console.log("after",plus[i])


     }
    
    let itemId = 1;
    const tempId = await getHighestId();
    const id = tempId[0].max + 1;
    const arr = [];

    let totalPrice = 0;
    for(let i = 0; i<foodName.length; i++){
        if(offerName[i] !== "NONE"){
            let materialPrice = 0;
            let foodMinus = await minus[i].split('&');
            let foodPlus = await plus[i].split('&');

                for(let j = 0; j<foodPlus.length; j++){
                    if(foodPlus[j] !== "NONE"){
                        const materials = await foodPlus[j].split(',');
                        for(let k = 0; k<materials.length; k++){
                            const temp = await getMaterialPrice(materials[k]);
                            materialPrice += temp[0].price;
                        }
                    }
                
            };
            const offerPrice = await getOfferPrice(offerName[i]);;
            const foodmaterialPrice = materialPrice + offerPrice[0].price;
            const offer = await getOfferItem(offerName[i]);
            const offerItems = await getFoodFromOffer(offer[0].id);
            totalPrice += foodmaterialPrice;
            for(let j = 0; j<offerItems.length; j++){

                const data = {
                    orderId: id,
                    orderName: xss(orderName),
                    itemId: itemId,
                    offerName: xss(offerName[i]),
                    foodName: xss(offerItems[j].foodname),
                    minus: xss(foodMinus[j]),
                    plus: xss(foodPlus[j]),
                    price: foodmaterialPrice,
                    totalprice: totalPrice,
                    totalTime: totalTime,
                };
                arr.push(data);
            }
            itemId += 1;
        }
        

        else{

            let materialPrice = 0;
            if(plus[i] === "NONE"){
                materialPrice = 0;
            }
            else{
                const materials = await plus[i].split(',');
                
                for(let j = 0; j<materials.length; j++){
                    const temp = await getMaterialPrice(materials[j])
                    materialPrice += temp[0].price;
                    if(materialPrice === undefined){
                        materialPrice = 0;
                    }
                }
            }
            
            const foodPrice = await getFoodPrice(foodName[i]);
            const foodmaterialPrice = materialPrice + foodPrice[0].price;
            totalPrice += foodmaterialPrice;
            const data = {
                orderId: id,
                orderName: xss(orderName),
                itemId: itemId,
                offerName: xss(offerName[i]),
                foodName: xss(foodName[i]),
                minus: xss(minus[i]),
                plus: xss(plus[i]),
                price: foodmaterialPrice,
                totalprice: totalPrice,
                totalTime: totalTime,
            };
            arr.push(data);
            itemId += 1;
        }
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
        
        return ({ status: 200, data: arr });
        
    }
    
/**
 * 
 * get Orders
 * 
 * @returns {promise}
 */

 async function getOrder(){
     const data = await getOrders();
     return data;
 }




 /**
  * 
  * get Food from Offer 
  * 
  * @param {Int} id - ID of the offer
  */

  async function getFoodInOffer(id){
      const data = await getFoodFromOffer(id);
      return data;
  }


  /**
   * 
   *  get Materials from Food
   * 
   * @param {int} id - ID of the food
   * 
   */

  async function getMaterialsInFood(id){
      const data = await getMaterialsForFood(id);
      return data;
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
    getOrder,
    getFoodInOffer,
    getMaterialsInFood,
};
 

 

