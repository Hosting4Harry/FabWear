const express = require("express");
// const mysql = require("mysql");
const db = require('./models');
const cors = require("cors");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Insta = require("instamojo-nodejs");
// const url = require('url');
// const open = require('openurl');
const { QueryTypes } = require("sequelize");
const saltRounds = 10;
require('dotenv').config();
const PORT = process.env.PORT || 8000;
console.log(PORT)
// const API_KEY = "test_******";
const API_KEY = process.env.API_KEY;
// const AUTH_KEY = "test_*****";
const AUTH_KEY = process.env.AUTH_KEY;

Insta.setKeys(API_KEY, AUTH_KEY);
Insta.isSandboxMode(true);

(async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync();
    } catch (error) {
        console.log(error);
    }
})();

const app = express()
app.use(cors())
app.use(express.json())
// var db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'YOTIpnJWq5HS',
//     database: 'ecom-react',
//     insecureAuth: true
// });
app.get("/", (req, res) => {
    res.send("hi")
})
// get data 
app.get("/getdataall", async (req, res) => {
    await db.products.findAll()
        .then(result => {
            res.send(result)
        }).catch(error => {
            console.log(error)
        })
    //     let sql = `select * from products`;
    //     db.query(sql, (err, result) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         else {
    //             res.send(result)
    //         }
    //     })
})
app.get("/getdata", async (req, res) => {
    let sql = `select * from products ORDER BY RAND() limit 6`;
    await db.sequelize.query(sql, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result)
        }).catch(error => [
            console.log(error)
        ])
    // let sql = `select * from products ORDER BY RAND() limit 6`;
    // db.query(sql, (err, result) => {
    // })
})
app.get("/getdata/:id", async (req, res) => {
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
    // let sqll = `select * from products where id=${id}`;
    // db.query(sqll, (err, result) => {
    // })
})
app.get("/sort/:price", async (req, res) => {
    const price = req.params.price;
    if (price === '200') {
        let sqll = `Select * FROM products WHERE price < 200`;
        await db.sequelize.query(sqll, { type: QueryTypes.SELECT })
            .then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error)
            })
        // let sqll = `select * from products WHERE price < 200`;
        // db.query(sqll, (err, result) => {
        //     if (err) {
        //         console.log(err)
        //     }
        //     else {
        //         res.send(result)
        //     }
        // })

    }
    else if (price === '200_500') {
        let sqll = `SELECT * FROM products WHERE price >=200 && price <= 500`;
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
app.get("/getaddress/:userid", async (req, res) => {
    const userid = req.params?.userid;
    await db.user_data.findAll({
        where: {
            user_id: userid
        }
    }).then(result => {
        res.send(result)
    }).catch(error => {
        console.log(error);
    })
})
// let sql = `select * from user_data where user_id=${userid}`;
// db.query(sql, (err, result) => {
// })
app.get("/account/:id", async (req, res) => {
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
    // let sqll = `select * from orders where userid=${id} && orderstatus='order done'`;
})
app.get("/myorder/:id", (req, res) => {
    const id = +req.params.id;
    let sqll = `SELECT * FROM orderitems,products WHERE orderitems.productid = products.id && orderitems.orderid=${id}`
    db.sequelize.query(sqll, { type: QueryTypes.SELECT })
        .then(result => {
            res.send(result)
        }).catch(error => {
            console.log(error)
        })
})

// post details 
app.post("/addaddress", async (req, res) => {
    const { name, email, phone, address } = req.body;
    const data = {
        name,
        email,
        phone,
        address,
        user_id: +req.body.userId
    }
    await db.user_data.create(data)
        .then(response => {
            res.send({ msg: "Address inserted Successfully" })
        }).catch(error => {
            console.log(error);
        })
    // let sql = "INSERT INTO `user_data` SET ?";
    // db.query(sql, data, (err, result) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         res.send({ msg: "Address inserted Successfully" })
    //     }
    // })
    // console.log(data)
})
app.post("/buynow", (req, res) => {
    const cartdata = req.body.cart
    const paymentemail = req.body.paymentemail
    const name = req.body.name;
    var insta = new Insta.PaymentData();

    const REDIRECT_URL = "http://localhost:3000/success";

    insta.setRedirectUrl(REDIRECT_URL);
    insta.send_email = "True";
    insta.send_sms = "False";
    insta.purpose = "React Ecom"; // REQUIRED
    insta.amount = req.body.totalprice;
    insta.name = name;
    insta.email = paymentemail; // REQUIRED

    Insta.createPayment(insta, function (error, response) {
        if (error) {
            console.log("something went wrong")
        } else {
            const responseData = JSON.parse(response);
            const redirectUrl = responseData.payment_request?.longurl;
            // console.log(redirectUrl)
            //   open(response.payment_request.longurl);
            const data = {
                userid: req.body.userid,
                totalprice: req.body.totalprice,
                orderstatus: responseData.payment_request?.status,
                paymentmode: req.body.paymentmode,
                paymentid: responseData.payment_request?.id
            }
            let sql = "INSERT INTO `orders` SET ?";
            db.sequelize.query(sql, { type: QueryTypes.INSERT })
                .then(result => {
                    for (let i = 0; i < cartdata.length; i++) {
                        // console.log(cartdata[i].name)
                        const detailsdata = {
                            orderid: result.insertId || new Date().getTime(),
                            productid: cartdata[i].id,
                            productqty: cartdata[i].qty,
                            productprice: cartdata[i].price
                        }
                        let sqll = "INSERT INTO `orderitems` SET ?";
                        db.sequelize.query(sqll, { type: QueryTypes.INSERT })
                            .then(result => {
                                console.log(result)
                            })
                    }
                }).catch(error => {
                    console.log(error)
                })
            res.send(response)
        }
    })
})

app.post("/paydetails", (req, res) => {
    const pid = req.body.pid
    const pyid = req.body.pyid
    if (pid === pyid) {
        let sql = `update orders set orderstatus="order done" where paymentid='${pid}'`
        db.sequelize.query(sql)
            .then(result => {
                res.send({ msg: "order done Successfully" })
            }).catch(error => {
                console.log(error)
            })
    }
})

app.post("/contact", (req, res) => {
    res.send({ message: " sent " })
})
// edit address 

app.post("/editadd", async (req, res) => {
    const { name, email, phone, address } = req.body;
    const user_id = +req.body.userId
    await db.user_data.update({
        name: name, email: email, phone: phone, address: address
    }, {
        where: {
            user_id: user_id
        }
    }).then(result => {
        res.send({ msg: "edit Successfully" })
    }).catch(error => {
        console.log(error)
    })
})

app.post("/register", (req, res) => {
    const { email, username, password } = req.body;
    bcrypt.hash(password, saltRounds, async (errr, hash) => {
        const data = {
            username,
            email,
            password: hash,
        };
        if (errr) {
            console.log(errr);
        }
        else {
            let result;
            await db.users.findAll({
                where: {
                    email: email
                }
            }).then(response => {
                result = response;
            }).catch(error => {
                result = error
            })
            if (result?.fatal) {
                console.trace('fatal error: ' + er.message);
            }
            else if (result?.length > 0) {
                res.send({ msg: "User Email Already Present" })
            }
            else {
                await db.users.create(data)
                    .then(response => {
                        res.send({ userData: response });
                    }).catch(error => {
                        console.log(error);
                    })
            }
        }
    })
})

const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.send({ login: false, msg: "need token" });
    }
    else {
        jwt.verify(token, 'ecomreact', (err, decoded) => {
            if (err) {
                res.send({ login: false, msg: "need for token" });
            }
            else {
                req.userID = decoded.id;
                next();
            }
        })
    }
}

app.get("/isAuth", verifyJwt, (req, res) => {
    res.send({ login: true, msg: "done" });
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    await db.users.findOne({
        where: {
            email: email
        }
    }).then(result => {
        if (result) {
            bcrypt.compare(password, result.password, (errr, response) => {
                if (response) {
                    const id = result.id;
                    const token = jwt.sign({ id }, "ecomreact", {
                        expiresIn: 60 * 60 * 24,
                    })
                    res.send({ login: true, token: token, user: result.username, userID: result.id, userEmail: result.email })
                    // res.send({login:true,user:result[0].name})
                }
                else {
                    res.send({ login: false, msg: "Wrong Password" });
                }
            })
        } else {
            res.send({ login: false, msg: "User Email Not Exits" });
        }
    }).catch(error => {
        console.log(error);
    })
    // let sql = `select * from users where email='${email}'`;
    // // console.log(sql);
    // db.query(sql, (err, result) => {
    // if (!userData) {
    //     // res.send({err:err})
    //     console.log("err");
    // }
    // else {
    //     res.send({ login: false, msg: "User Email Not Exits" });
    //     // console.log("noo email ")
    // }
    // })
})

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})
