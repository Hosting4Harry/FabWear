const express = require("express");
const { QueryTypes } = require("sequelize");
const router = express();
const db = require('../../models')
const { verifyJwt } = require('../../controllers/account/middleware');
router.get('/:id', verifyJwt, async (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM products,wishlists WHERE wishlists.productId = products.id && wishlists.userId=${id}`
    await db.sequelize.query(sql, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result);
        }).catch(error => {
            console.log(error);
        });
})

router.post('/', verifyJwt, async (req, res) => {
    const result = await db.wishlists.findOne({
        where: {
            userId: req.body.userId,
            productId: req.body.id
        }
    })
    if (result) return res.send({ message: "wishlist deleted" });
    const data = {
        userId: req.body.userId,
        productId: req.body.id
    }
    await db.wishlists.create(data)
        .then(response => {
            res.send(data);
        }).catch(error => {
            console.log(error);
        });
    await db.products.update({
        product_status: true
    },
        {
            where: {
                id: +req.body.id
            }
        })
});
router.delete('/:id', async (req, res) => {
    await db.products.update({
        product_status: false
    },
        {
            where: {
                id: +req.params.id
            }
        })
    await db.wishlists.destroy({
        where: {
            productId: +req.params.id
        }
    })
})

module.exports = router;