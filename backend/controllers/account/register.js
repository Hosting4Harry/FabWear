const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../../models');

router.post("/", (req, res) => {
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
                    .then(async response => {
                        await db.user_roles.create({ name: "User", userId: response.id, roleId: 3 })
                        res.send({ userData: response });
                    }).catch(error => {
                        console.log(error);
                    })
            }
        }
    })
})

module.exports = router;