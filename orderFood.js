const express = require('express');
const {
    newOrder,
} = require('./orderAPI');

const router = express.Router();
router.use(express.urlencoded({ extended: true}));


router.post('/', async (req, res) => {
    const {
        orderId,
        orderName,
        foodName,
        minus,
        plus,
        price,
        totalprice,
        totalTime,
    } = req.body;

    const {status, data} = await newOrder({
        orderId, orderName, foodName, minus, plus, price, totalprice, totalTime,
    });

    return res.status(status).json(data);
});

module.exports = router;