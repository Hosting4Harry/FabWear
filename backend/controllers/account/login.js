const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const db = require('../../models');
var jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    const { email, password, checked } = req.body;
    await db.users.findOne({
        where: {
            email: email
        }
    }).then(result => {
        if (result) {
            bcrypt.compare(password, result.password, async (errr, response) => {
                if (response) {
                    const id = result.id;
                    const role = await db.user_roles.findOne({
                        where: {
                            userId: id
                        }
                    });
                    // const claims = await db.claims.findAll({
                    //     where: {
                    //         roleId: role.roleId
                    //     }
                    // });
                    // var claim = [];
                    // (claims.map((i) => { return (claim.push(+i.claims.split('_')[0])) }));
                    // const token = jwt.sign({ id: id, claims: claim }, "ecomreact", { 
                    const token = jwt.sign({ id: id, role: role.roleId }, "ecomreact", {
                        expiresIn: checked ? 60 * 60 * 24 : 60,
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