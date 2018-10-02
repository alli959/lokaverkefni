const {
    addOrder,
} = require('./food-db');


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
 * @param {Array} order.price  - price of each item
 * @param {Int} order.totalprice - total price of the order
 * @param {Int} order.totalTime - time it takes to do the order
 * 
 * @returns {Promise}
 */

 async function newOrder({
     orderId,
     orderName,
     foodName,
     minus,
     plus,
     price,
     totalprice,
     totalTime,
 } = {}) {
     console.log("validation here");

 

    const arr = [];
    console.log(orderId)

    for(let i = 0; i<foodName.length; i++){
        const data = {
            orderId: orderId,
            orderName: orderName,
            foodName: foodName[i],
            minus: minus[i],
            plus: plus[i],
            price: price[i],
            totalprice: totalprice,
            totalTime: totalTime,
        };
        await arr.push(data);
        console.log(arr);
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

module.exports = {
    newOrder,
};
 

 

