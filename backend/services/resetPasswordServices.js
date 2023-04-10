const { send2faOTP } = require('./EmailServices');
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function resetPassword(req, res, next) {
    const sentOtp = Math.floor(Math.random() * 899999 + 100000);
    const obj = req.body;
    const email = obj.email;
    // await deleteOtp(email);
    if (email) {
        const account = await db.users.findOne({
            where: {
                email: email
            }
        });
        if (account) {
            await db.user_otps.create({
                email: email,
                otp: sentOtp,
                user_id: account.id
            });
            // await send2faOTP(email, sentOtp);
            res.send({ message: "OTP Sent....", otp: sentOtp, status: false })
        } else {
            res.send({ message: "account not found", status: false });
        }
    } else {
        const otp = obj.otp;
        const password = obj.password;
        const otpDetails = await db.user_otps.findOne({
            where: {
                otp: otp
            }
        });

        bcrypt.hash(password, saltRounds, async (errr, hash) => {
            const data = {
                password: hash,
            };
            if (errr) {
                console.log(errr);
            }
            else {
                // let result;
                // await db.users.findAll({
                //     where: {
                //         email: otpDetails.email
                //     }
                // }).then(response => {
                //     result = response;
                // }).catch(error => {
                //     result = error
                // })
                // if (result?.fatal) {
                //     console.trace('fatal error: ' + er.message);
                // }
                // else if (result?.length > 0) {
                //     res.send({ msg: "User Email Already Present" });
                // }
                // else {
                await db.users.update(data, {
                    where: {
                        email: otpDetails.email
                    }
                })
                    .then(async response => {
                        res.send({ userData: response });
                    }).catch(error => {
                        console.log(error);
                    });
            }
        });
        // if (otpDetails) {
        //     const account = await db.users.findOne(otpDetails.email);
        //     await accountUpdate(otpDetails.email, password, account.TwoFacEnable, account.id)
        //     await deleteOtp(otpDetails.email);
        //     res.send({ message: "Reset password successful", status: true });
        // } else {
        //     res.send({ message: "Reset password unsuccessful", status: false })
        // }
    }
}
module.exports = { resetPassword }