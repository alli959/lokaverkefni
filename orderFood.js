const express = require('express');
const {
    newOrder,
    getallFood,
    getOffer,
    getBurger,
    getBoat,
    getSandwich,
    getMaterial,
} = require('./orderAPI');

const router = express.Router();
router.use(express.urlencoded({ extended: true}));

router.get('/', async (req, res) => {


})


router.post('/orders', async (req, res) => {
    const {
        orderName,
        foodName,
        minus,
        plus,
        totalTime,
    } = req.body;

    const {status, data} = await newOrder({
        orderName, foodName, minus, plus, totalTime,
    });

    return res.status(status).json(data);
});



router.get('/food', async  (req, res) => {
    const food = await getallFood();
    await res.json(food);
});



router.get('/offers', async (req,res) => {
    const offers = await getOffer();
    await res.json(offers);
});



router.get('/burgers', async (req,res) => {
    const burgers = await getBurger();
    console.log(burgers);
    await res.json(burgers);

});

router.get('/boats', async (req,res) => {
    const boats = await getBoat();
    await res.json(boats);

});

router.get('/sandwiches', async (req,res) => {
    const sandwiches = await getSandwich();
    await res.json(sandwiches);

});


router.get('/materials', async (req,res) => {
    const materials = await getMaterial();
    await res.json(materials);

});





module.exports = router;