const express = require('express');
const {
    newOrder,
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

module.exports = router;