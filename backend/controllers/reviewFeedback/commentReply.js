const express = require('express');
const router = express();
const db = require('../../models');
const { verifyJwt } = require('../account/middleware');
const { QueryTypes } = require('sequelize');

router.get('/:id', async (req, res) => {
    const query = `select c.*,u.username from commentreplies c join users u on u.id=c.user_id where c.commentId=${req.params.id}`

    await db.sequelize.query(query, { type: QueryTypes.SELECT })
        .then(result => {
            res.send({ status: true, reviewData: result });
        }).catch(error => [
            console.log(error)
        ]);

})
router.post('/', async (req, res) => {
    await db.commentreplies.create(req.body)
        .then(async (response) => {
            const data = await db.sequelize.query(`select replyCount from comments where id=${req.body.commentId}`, { type: QueryTypes.SELECT })
            data[0].replyCount = data[0].replyCount + 1
            await db.sequelize.query(`update comments set replyCount=${data[0].replyCount} where id=${req.body.commentId}`, { type: QueryTypes.UPDATE })
                .then(response => {
                    res.send({ status: true });
                }).catch(err => {
                    res.status(401).send({ msg: 'comment count not added ' })
                })
            console.log('first')
        }).catch(err => {
            res.status(401).send({ msg: 'please login' })
        })

})

module.exports = router;