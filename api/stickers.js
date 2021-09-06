const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

//Middleware
function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    //else
    next(new Error('Invalid ID'));
}

router.get('/', (req,res) => {
    queries.getAll().then(stickers => {
        res.json(stickers);
    })
});

router.get('/:id', isValidId, (req, res) => {
    res.json({
        message: '😳'
    });
});

module.exports = router;
