const express = require('express');
const {
    newOrder,
    getallFood,
    getOffer,
} = require('./orderAPI');

const router = express.Router();
router.use(express.urlencoded({ extended: true}));


router.post('/', async (req, res) => {
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
    console.log(offers);
    await res.json(offers);
})

module.exports = router;