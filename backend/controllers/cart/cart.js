const express = require('express');
const { QueryTypes } = require('sequelize');
const router = express();
const db = require('../../models');

router.get('/:id', async (req, res) => {
    const id = +req.params.id;
    const sql = `SELECT * FROM products,carts WHERE carts.productId= products.id && carts.userId=${id}`
    await db.sequelize.query(sql, { type: QueryTypes.SELECT })
        // await db.carts.findAll()
        .then(result => {
            res.send(result);
        }).catch(err => {
            console.log(err);
        })
})

router.post('/', async (req, res) => {
    var result;
    if (req.body.size) {
        result = await db.carts.findOne({
            where: {
                productId: req.body.productId,
                size: req.body.size
            }
        })
    } else {
        result = await db.carts.findOne({
            where: {
                productId: req.body?.productId
            }
        })
    }

    if (result) {
        return;
        // await db.carts.update({
        //     productqty: +req.body.qty
        // }, {
        //     where: {
        //         productId: req.body.id,
        //         size:req.body.size
        //     }
        // })
    } else {
        const data = {
            userId: +req.body.userId,
            productId: req.body.productId,
            productqty: +req.body.qty,
            size: req.body.size
        }
        await db.carts.create(data)
            .then(result => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            });
    }
});

router.delete('/:id', async (req, res) => {
    await db.carts.destroy({
        where: {
            id: +req.params.id
        }
    });
});

module.exports = router;
