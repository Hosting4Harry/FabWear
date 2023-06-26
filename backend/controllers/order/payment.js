const express = require("express");
const Razorpay = require("razorpay");
const db = require("../../models");
const crypto = require('crypto');
const { QueryTypes } = require("sequelize");
const router = express();

router.post("/orders", async (req, res) => {
    const { cart, paymentemail, name } = req.body;
    const data = {
        name: req.body.name,
        orderstatus: req.body.orderstatus,
        paymentemail: req.body.paymentemail,
        paymentmode: req.body.paymentmode,
        totalprice: req.body.totalprice,
        userid: req.body.userid,
        addressId: +req.body.address.id
    }
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_T3tAATbEcOqopL",
            key_secret: process.env.RAZORPAY_SECRET || "IIDn2dhDvH9fIEE83BD6odGI",
        });
        const options = {
            amount: data.totalprice * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");
        // ----------------------------------------order create

        var orderData;
        await db.orders.create(data)
            .then(result => {
                orderData = result;
                for (let i = 0; i < cart.length; i++) {
                    // console.log(cart[i].name)
                    const detailsdata = {
                        orderid: result.id,
                        productid: cart[i].productId,
                        productqty: cart[i].productqty,
                        productprice: cart[i].price
                    }
                    // let sqll = "INSERT INTO `orderitems` SET ?";
                    db.orderitems.create(detailsdata)
                        .then(result2 => {
                            const trackingDetails = {
                                orderid: result.id,
                                orderProcess: 0,
                                qualitycheck: 0,
                                shipped: 0,
                                dispatched: 0,
                                delivered: 0,
                            }
                            db.ordertrack.create(trackingDetails).then(result => {

                                console.log(result);
                            })
                        })
                }
            }).catch(error => {
                console.log(error);
            });
        // --------------------------------------
        res.json({ orderData: orderData, order: order });
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            orderData
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "IIDn2dhDvH9fIEE83BD6odGI");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        db.orders.update({
            orderstatus: "Order Done",
            paymentid: razorpayPaymentId
        },
            {
                where: {
                    id: orderData.id
                }
            });

        let sqll = `SELECT * FROM orderitems,products WHERE orderitems.productid = products.id && orderitems.orderid=${orderData.id}`
        db.sequelize.query(sqll, { type: QueryTypes.SELECT })
            .then(result => {
                result.map(item => {
                    return db.carts.destroy({
                        where: {
                            productId: item.id
                        }
                    });
                });
            }).catch(error => {
                console.log(error);
            });

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;