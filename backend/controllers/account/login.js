const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const db = require('../../models');
var jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    await db.users.findOne({
        where: {
            email: email
        }
    }).then(result => {
        if (result) {
            bcrypt.compare(password, result.password, async (errr, response) => {
                if (response) {
                    const id = result.id;

                    // const role = await findOneUserRole(id);
                    // const claims = await findAllClaimById(role?.roleId);


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
});

module.exports = router;