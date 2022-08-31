const express = require ('express');

const app = express ();

app.use(express.json());

app.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message : "objet créer"
    })
})


module.exports = app;
