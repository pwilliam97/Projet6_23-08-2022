// On importe le modèle des user
const User = require('../models/user');

//On importe le systeme de cryptage des mot de passes
const bcrypt = require('bcrypt');
const user = require('../models/user');

//On importe le package des token d'identification
const jwt = require('jsonwebtoken')

//variable d'environnement
const dotenv = require('dotenv')
const result = dotenv.config()

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
    user.findOne({email : req.body.email})
    .then(user => {
        if ( user === null){
            res.status(401).json({message : 'Paire identifiant/ mot de passe incorrecte'});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid){
                    res.status(401).json({message : 'Paire identifiant/ mot de passe incorrecte'})
                } else {
                    res.status(200).json({
                        userId : user._id,
                        token : jwt.sign(
                            {userId: user._id},
                            process.env.YOUR_TOKEN,
                            { expiresIn: '24h'},
                        )
                    });
                }
            })
            .catch(error => {
                res.status(500).json({error});
            })
        }
    })
    .catch(error => {
        res.status(500).json({error});
    })
};