
const jwt = require('jsonwebtoken');


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
module.exports = { verifyJwt }