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
    data = ''
    for (const [key, value] of Object.entries(req.body)) {
        console.log(key, value);
        data += key + '=' + value + ","
    }
    data = data.substring(0, data.length - 1);

    const sql = `UPDATE ordertracks SET ${data} WHERE id=${id}`
    await db.sequelize.query(sql, { type: QueryTypes.UPDATE })
        .then(result => {
            res.send({ msg: 'updated successfully' })
        })
        .catch(err => {
            console.log(err)
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
    const sql = `select * from ordertracks where orderitemid = ${id}`
    await db.sequelize.query(sql, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result);
        })
})
router.get('/by/:id', async (req, res) => {
    const sql = `select ot.*,p.product_image from ordertracks ot join orderitems oi on oi.id=ot.orderitemid join products p on p.id= oi.productid where oi.orderid=${req.params.id}`
    await db.sequelize.query(sql, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result);
        })
})
// router.get('/', async (req, res) => {
//     await db.ordertrack.findAll().then(result => {
//         res.send(result);
//     })
// })

module.exports = router;