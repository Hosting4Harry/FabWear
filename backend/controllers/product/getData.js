const express = require('express');
const router = express();
const db = require('../../models');
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const { Sequelize } = require('../../models');
const path = require('path');
var multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = req.body.category;
        cb(null, path.join(__dirname, "../../../frontend/public/img/" + dest))
    },
    filename: (req, file, cb) => {
        var imageUrl = file.originalname
        cb(null, imageUrl)
    }
});
const upload = multer({
    storage: storage
});

router.post("/addproduct", upload.single('product_image'), async (req, res) => {
    await db.products.create({
        name: req.body.name,
        price: +req.body.price,
        product_image: "/" + req.body.category + "/" + req.file?.originalname
    }).then(result => {
        res.send({ message: "Product Added" });
    }).catch(error => {
        console.log(error);
    });
});

router.get("/getdataall", async (req, res) => {
    // await db.products.findAll({ order: Sequelize.literal('rand()') })
    await db.products.findAll()
        .then(result => {
            res.send(result);
        }).catch(error => {
            console.log(error);
        });
})

router.get('/searchProduct/:name', async (req, res) => {
    const name = req.params.name;
    await db.products.findAll({
        where: {
            [Op.or]: [{
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            {
                product_image: {
                    [Op.like]: `%${name}%`
                }
            }]
        },
        limit: 10
    }).then(result => {
        res.send(result);
    }).catch(error => {
        console.log(error);
    });

});

router.get("/getdata", async (req, res) => {
    let sql = `select * from products ORDER BY RAND() limit 8`;
    await db.sequelize.query(sql, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result);
        }).catch(error => [
            console.log(error)
        ]);
});
router.get("/getdata/:id", async (req, res) => {
    const id = req.params.id;
    await db.products.findAll({
        where: {
            id: id
        }
    }).then(result => {
        res.send(result);
    }).catch(error => {
        console.log(error);
    });
});
router.get("/sort/:price", async (req, res) => {
    const price = req.params.price;
    if (price === '200') {
        let sqll = `Select * FROM products WHERE price< 200`;
        await db.sequelize.query(sqll, { type: QueryTypes.SELECT })
            .then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error);
            });
    }
    else if (price === '200_500') {
        let sqll = `SELECT * FROM products WHERE price >= 200 && price <= 500`;
        db.sequelize.query(sqll, { type: QueryTypes.SELECT })
            .then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error);
            })
    }
    else if (price === '500_1000') {
        let sqll = `SELECT * FROM products WHERE price > 500 && price <= 1000`;
        db.sequelize.query(sqll, { type: QueryTypes.SELECT })
            .then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error);
            })
    }
})

module.exports = router;