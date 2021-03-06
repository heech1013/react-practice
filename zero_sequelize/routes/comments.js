const express = require('express');
const router = express.Router();
const { User, Comment } = require('../models');

// GET /comments
// GET /comments/:id
router.get('/:id', (req, res, next) => {
    Comment.findAll({
        include: {  // 모델 간의 관계 설정
            model: User,  // 어떤 모델인지 지정
            where: { id: req.params.id }  // 쿼리 조건 설정
        }
    })
        .then((comments) => {
            console.log(comments);
            res.json(comments);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.patch('/:id', (req, res, next) => {
    Comment.update({
        comment: req.body.comment
    }, {
        where: { id: req.params.id }
    })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.delete('/:id', (req, res, next) => {
    Comment.destroy({
        where: { id: req.params.id }
    })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.post('/', (req, res, next) => {
    Comment.create({
        commenter: req.body.id,
        comment: req.body.comment
    })
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;