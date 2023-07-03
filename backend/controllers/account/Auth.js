const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const { verifyJwt } = require('../../controllers/account/middleware')
// const verifyJwt = (req, res, next) => {
//     const token = req.headers["x-access-token"]
//     if (!token) {
//         res.send({ login: false, msg: "need token" });
//     }
//     else {
//         jwt.verify(token, 'ecomreact', (err, decoded) => {
//             if (err) {
//                 res.send({ login: false, msg: "need for token" });
//             }
//             else {
//                 req.userID = decoded.id;
//                 next();
//             }
//         })
//     }
// }
router.get("/", verifyJwt, (req, res) => {
    res.send({ login: true, msg: "done" });
});

module.exports = router;