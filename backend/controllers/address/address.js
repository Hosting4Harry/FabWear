const express = require('express');
const router = express();
const db = require('../../models');

router.get("/getaddress/:userid", async (req, res) => {
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
router.post("/addaddress", async (req, res) => {
    const { fname, lname, email, phone, address, user_id, state, city, zip } = req.body;
    const name = fname + " " + lname
    const addressData = address + ", " + state + ", " + city
    const data = {
        name,
        email,
        phone,
        address: addressData,
        user_id
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
router.post("/editadd", async (req, res) => {
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
});

module.exports = router;