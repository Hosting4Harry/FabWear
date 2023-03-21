const express = require('express');
const router = express();
const db = require('../../models');
const { QueryTypes } = require("sequelize");

router.get("/account/:id", async (req, res) => {
    const id = +req.params.id;
    await db.orders.findAll({
        where: {
            userid: id,
            orderstatus: 'order done'
        }
    }).then(result => {
        res.send(result)
    }).catch(error => {
        console.log(error);
    })
});
router.get("/myorder/:id", (req, res) => {
    const id = +req.params.id;
    let sqll = `SELECT * FROM orderitems,products WHERE orderitems.productid = products.id && orderitems.orderid=${id}`
    db.sequelize.query(sqll, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result)
        }).catch(error => {
            console.log(error)
        })
});

module.exports = router;