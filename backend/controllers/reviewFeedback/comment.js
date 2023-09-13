const express = require('express');
const router = express();
const db = require('../../models');
const { verifyJwt } = require('../account/middleware');
const { QueryTypes } = require('sequelize');
router.get('/:id', async (req, res) => {
    const query = `select * from Comments where productId=${req.params.id}`

    await db.sequelize.query(query, { type: QueryTypes.SELECT })
        .then(result => {
            res.send({ status: true, reviewData: result });
        }).catch(error => [
            console.log(error)
        ]);

    // const data = await db.comment.findAll({
    //     where: {
    //         productId: req.params.id
    //     }
    // });
    // res.send({ status: true, reviewData: data });
})
router.post('/', async (req, res) => {
    await db.comments.create(req.body)
        .then(response => {
            res.send({ status: true });
        }).catch(err => {
            res.status(401).send({ msg: 'please login' })
        })
})

module.exports = router;