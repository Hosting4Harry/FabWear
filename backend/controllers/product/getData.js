const express = require('express');
const router = express();
const db = require('../../models');
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");

router.get("/getdataall", async (req, res) => {
    await db.products.findAll()
        .then(result => {
            res.send(result)
        }).catch(error => {
            console.log(error)
        })
})

router.get('/searchProduct/:name', async (req, res) => {
    const name = req.params.name;
    await db.products.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        }
    }).then(result => {
        res.send(result)
    }).catch(error => {
        console.log(error)
    })

});

router.get("/getdata", async (req, res) => {
    let sql = `select * from products ORDER BY RAND() limit 6`;
    await db.sequelize.query(sql, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result)
        }).catch(error => [
            console.log(error)
        ])
});
router.get("/getdata/:id", async (req, res) => {
    const id = req.params.id;
    await db.products.findAll({
        where: {
            id: id
        }
    }).then(result => {
        res.send(result)
    }).catch(error => {
        console.log(error)
    })
});
router.get("/sort/:price", async (req, res) => {
    const price = req.params.price;
    if (price === '200') {
        let sqll = `Select * FROM products WHERE price< 200`;
        await db.sequelize.query(sqll, { type: QueryTypes.SELECT })
            .then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error)
            })
    }
    else if (price === '200_500') {
        let sqll = `SELECT * FROM products WHERE price >= 200 && price <= 500`;
        db.sequelize.query(sqll, { type: QueryTypes.SELECT })
            .then(result => {
                res.send(result)
            }).catch(error => {
                console.log(error);
            })
    }
    else if (price === '500_1000') {
        let sqll = `SELECT * FROM products WHERE price > 500 && price <= 1000`;
        db.sequelize.query(sqll, { type: QueryTypes.SELECT })
            .then(result => {
                res.send(result)
            }).catch(error => {
                console.log(error);
            })
    }
})

module.exports = router;