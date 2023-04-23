const express = require('express');
const router = express();
const db = require('../../models');

router.get('/:id', async (req, res) => {
    const data = await db.reviews.findAll({
        where: {
            productId: req.params.id
        }
    });
    res.send({ status: true, reviewData: data });
})
router.post('/', async (req, res) => {
    await db.reviews.create(req.body);
    res.send({ status: true });
})

module.exports = router;
