const express = require('express');
const { QueryTypes } = require('sequelize');
const router = express();
const db = require('../../models');

router.get('/:id', async (req, res) => {
    const id = +req.params.id
    const sql = `SELECT * FROM carts,products WHERE carts.productId= products.id && carts.userId=${id}`
    await db.sequelize.query(sql, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result);
        }).catch(err => {
            console.log(err);
        })
})

router.post('/', async (req, res) => {
    const result = await db.carts.findOne({
        where: {
            productId: req.body.id
        }
    })
    if (result) {
        await db.carts.update({
            productqty: +req.body.qty
        }, {
            where: {
                productId: req.body.id
            }
        })
    } else {
        const data = {
            userId: +req.body.userId,
            productId: req.body.id,
            productqty: +req.body.qty
        }
        await db.carts.create(data)
            .then(result => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            })
    }
})

router.delete('/:id', async (req, res) => {
    await db.carts.destroy({
        where: {
            productId: +req.params.id
        }
    })
})

module.exports = router;
