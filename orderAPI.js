const {
    addOrder,
} = require('./food-db');

const jsonFilePath = require('./data/testOrder.json');


/*
/**
 * Add order
 * 
 * @param {Object} order - order object to add
 * @param {Int} order.orderId - ID of the person who orders
 * @param {String} order.orderName - name of the person who orders
 * @param {String} order.name - name of the order
 * @param {String} order.minus - items the person doesn't want
 * @param {String} order.plus  - items the person wants extra
 * @param {int} order.totalprice - total price of the order
 * @param {int} order.time - time it takes to do the order
 * 
 * @returns {Promise}
 */

 async function newOrder(){

    const arr = [];
    const order = jsonFilePath;
    const length = order[0].foodName.length;
    for(let i = 0; i<length; i++){
        const data = {
            orderId: order[0].orderId,
            orderName: order[0].orderName,
            foodName: order[0].foodName[i],
            minus: order[0].minus[i],
            plus: order[0].plus[i],
            totalprice: order[0].totalprice,
            time: order[0].time,
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
      
} 

setTimeout(newOrder,2000);