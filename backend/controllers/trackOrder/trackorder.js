const express = require('express')
const router = express();
const db = require('../../models');
const { QueryTypes } = require('sequelize');

// router.post('/:id', async (req, res) => {
//     const id = req.params.id
//     const data = {
//         orderid: id,
//         orderProcess: req.body.orderprocess,
//         qualitycheck: req.body.qualitycheck,
//         shipped: req.body.shipped,
//         dispatched: req.body.Dispatched,
//         delivered: req.body.delivered,
//     }
//     await db.ordertrack.create(data)
//         .then(result => {
//             res.send({ msg: 'sent successfully' })
//         })
// })
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE ordertracks SET ${req.body.key}=${req.body.checked} WHERE orderid=${id}`
    await db.sequelize.query(sql, { type: QueryTypes.UPDATE })
        .then(result => {
            res.send({ msg: 'updated successfully' })
        })
})
router.get('/orderId/:id', async (req, res) => {
    const id = +req.params.id;
    await db.ordertrack.findOne({
        where: {
            orderid: id
        }
    }).then(result => {
        res.send('order is present')
    })
})

router.get('/:id', async (req, res) => {
    const id = +req.params.id;
    await db.ordertrack.findAll({
        where: {
            orderid: id
        }
    }).then(result => {
        res.send(result);
    })
})
router.get('/', async (req, res) => {
    await db.ordertrack.findAll().then(result => {
        res.send(result);
    })
})

module.exports = router;