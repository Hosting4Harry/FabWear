const express = require('express');
const router = express();
const { resetPassword } = require('../../services/resetPasswordServices');
router.get('/', (req, res) => {
    res.send({ message: "working>>>>" })
});
router.post('/', resetPassword);


module.exports = router;