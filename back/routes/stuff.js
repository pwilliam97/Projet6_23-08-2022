const express = require ('express');
const router = express.Router();

const thing = require('../models/thing');

router.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message : "objet créer"
    })
})

module.exports = router;