// On importe le modèle des user
const User = require('../models/user');

//On importe le systeme de cryptage des mot de passes
const bcrypt = require('bcrypt');

//création du controller signup
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
            .then (() => res.status(201).json({message: 'Utilisateurs créé !'}))
            .catch(error => res.status(400).json({error})); 
        })
        .catch(error => res.status(500).json({error}));            
};


//création du controller login
exports.login = (req, res, next) => {

};