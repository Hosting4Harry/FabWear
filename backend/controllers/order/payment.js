const express = require('express');
const router = express();
const db = require('../../models')
const Insta = require("instamojo-nodejs");
const API_KEY = process.env.API_KEY || "test_c06b46e28e2a2b035498f4721c5";
const AUTH_KEY = process.env.AUTH_KEY || "test_11139217a60baaae7ff95692cea";
Insta.setKeys(API_KEY, AUTH_KEY);
Insta.isSandboxMode(true);

router.post("/buynow", (req, res) => {
    const { cart, paymentemail, name } = req.body;
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
            // let sql = "INSERT INTO `orders` SET ?";
            db.orders.create(data)
                .then(result => {
                    for (let i = 0; i < cart.length; i++) {
                        // console.log(cart[i].name)
                        const detailsdata = {
                            orderid: result.id,
                            productid: cart[i].id,
                            productqty: cart[i].qty,
                            productprice: cart[i].price
                        }
                        // let sqll = "INSERT INTO `orderitems` SET ?";
                        db.orderitems.create(detailsdata)
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

router.post("/paydetails", (req, res) => {
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


module.exports = router;
