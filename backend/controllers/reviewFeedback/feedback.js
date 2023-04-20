const express = require('express');
const router = express();
const db = require('../../models');

router.get('/', async (req, res) => {
    const data = await db.feedbacks.findAll();
    res.send({ status: true, reviewData: data });
})
router.post('/', async (req, res) => {
    await db.feedbacks.create(req.body);
    res.send({ status: true });
})

module.exports = router;