const express = require('express');
const {
    newOrder,
    getallFood,
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

router.get('/hello', async  (req, res) => {
    const arr = [
        {"id":"1","pepp":"hello"},
        {"id":"2","pepp":"hello"}
    ];
    await res.json(arr);
});

module.exports = router;