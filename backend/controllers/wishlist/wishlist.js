const express = require("express");
const { QueryTypes } = require("sequelize");
const router = express();
const db = require('../../models')

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM wishlists,products WHERE wishlists.productId = products.id && wishlists.userId=${id}`
    await db.sequelize.query(sql, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result)
        }).catch(error => {
            console.log(error);
        })
})

router.post('/', async (req, res) => {
    const result = await db.wishlists.findOne({
        where: {
            productId: req.body.id
        }
    })
    if (result) return res.send({ message: "already exist" })
    const data = {
        userId: req.body.userId,
        productId: req.body.id,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        status: req.body.status
    }
    await db.wishlists.create(data)
        .then(response => {
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
});
router.delete('/:id', async (req, res) => {
    await db.wishlists.destroy({
        where: {
            productId: +req.params.id
        }
    })
})

module.exports = router;