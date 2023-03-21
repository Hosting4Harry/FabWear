const express = require("express");
// const mysql = require("mysql");
const db = require('./models');
const cors = require("cors");
// const morgan = require('morgan');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Insta = require("instamojo-nodejs");
// const url = require('url');
// const open = require('openurl');
const { QueryTypes } = require("sequelize");
require('dotenv').config();
const PORT = process.env.PORT || 8000;
// const API_KEY = "test_******";
const API_KEY = process.env.API_KEY;
// const AUTH_KEY = "test_*****";
const AUTH_KEY = process.env.AUTH_KEY;
Insta.setKeys(API_KEY, AUTH_KEY);
Insta.isSandboxMode(true);
const registerRouter = require('./controllers/account/register');
const loginRouter = require('./controllers/account/login');
const productRouter = require('./controllers/product/getData');
const addressRouter = require('./controllers/address/address');

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
// app.use(morgan('dev'));
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
app.use('/product', productRouter);


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
app.use('/address', addressRouter)

app.post("/buynow", (req, res) => {
    const { cartdata, paymentemail, name } = req.body;
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
    res.send({ message: " message sent successfully !! Thank You" })
})

// edit address 


app.use('/register', registerRouter);
app.use('/login', loginRouter);
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



app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})
