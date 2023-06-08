const express = require('express');
const router = express();
const db = require('../../models');
const { QueryTypes, Op } = require("sequelize");

router.get("/account/:id", async (req, res) => {
    const id = +req.params.id;
    await db.orders.findAll({
        where: {
            userid: id,
            [Op.or]: [{ orderstatus: 'Order Done' }, { orderstatus: "Cancelled" }]
        }
    }).then(result => {
        res.send(result)
    }).catch(error => {
        console.log(error);
    })
});
router.get("/pendingOrder/:id", async (req, res) => {
    const id = +req.params.id;
    await db.orders.findAll({
        where: {
            userid: id,
            [Op.or]: [{ orderstatus: 'Pending' }, { orderstatus: "Cancelled" }]
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
    // let sqll = `SELECT * FROM orderitems,products WHERE orderitems.orderid=${id} && orderitems.productid = products.id`
    db.sequelize.query(sqll, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result)
        }).catch(error => {
            console.log(error)
        })
});
router.get("/allOrder", async (req, res) => {
    let sqll = `SELECT * FROM orderitems,products WHERE orderitems.productid = products.id`
    db.sequelize.query(sqll, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result);
        }).catch(error => {
            console.log(error)
        })
})
router.get("/allOrders", async (req, res) => {
    await db.orderitems.findAll()
        .then(result => {
            res.send(result);
        }).catch(error => {
            console.log(error)
        })
})
module.exports = router;