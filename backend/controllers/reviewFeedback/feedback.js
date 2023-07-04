const express = require('express');
const router = express();
const db = require('../../models');
const { verifyJwt } = require('../account/middleware')
router.get('/', verifyJwt, async (req, res) => {
    const data = await db.feedbacks.findAll();
    res.send({ status: true, reviewData: data });
})
router.post('/', verifyJwt, async (req, res) => {
    await db.feedbacks.create(req.body);
    res.send({ status: true });
})

module.exports = router;