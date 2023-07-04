const express = require('express');
const router = express();
const db = require('../../models');
const { verifyJwt } = require('../account/middleware')
router.get('/:id', async (req, res) => {
    const data = await db.reviews.findAll({
        where: {
            productId: req.params.id
        }
    });
    res.send({ status: true, reviewData: data });
})
router.post('/', verifyJwt, async (req, res) => {
    await db.reviews.create(req.body)
        .then(response => {
            res.send({ status: true });
        }).catch(err => {
            res.status(401).send({ msg: 'please login' })
        })
})

module.exports = router;
