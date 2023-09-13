const express = require('express');
const router = express();
const db = require('../../models');
const { QueryTypes, Op } = require("sequelize");
const { verifyJwt } = require('../../controllers/account/middleware')
router.get("/account/:id", verifyJwt, async (req, res) => {
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
router.get("/pendingOrder/:id", verifyJwt, async (req, res) => {
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
router.get("/myorder/:id", verifyJwt, (req, res) => {
    const id = +req.params.id;
    let sqll = `SELECT oi.*,p.name,p.product_image,o.totalprice FROM orderitems oi join products p on oi.productid = p.id join orders o on o.id=oi.orderid WHERE oi.orderid=${id}`
    // let sqll = `SELECT * FROM orderitems,products WHERE orderitems.orderid=${id} && orderitems.productid = products.id`
    db.sequelize.query(sqll, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result)
        }).catch(error => {
            console.log(error)
        })
});
router.get("/allOrder", verifyJwt, async (req, res) => {
    let sqll = `SELECT * FROM orderitems,products WHERE orderitems.productid = products.id`
    db.sequelize.query(sqll, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result);
        }).catch(error => {
            console.log(error)
        })
})
router.get("/allOrders", verifyJwt, async (req, res) => {
    await db.orderitems.findAll()
        .then(result => {
            res.send(result);
        }).catch(error => {
            console.log(error)
        })
})
router.get("/all", verifyJwt, async (req, res) => {
    await db.orders.findAll()
        .then(result => {
            res.send(result);
        }).catch(error => {
            console.log(error)
        })
})
module.exports = router;