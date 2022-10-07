const Sauce = require('../models/sauces')
const fs = require('fs');

// REPONSE ATTENDUE : -POST- envoi toute les données fournis a la base de données 
exports.createSauce = (req, res, next) => {
    const SauceObject = JSON.parse(req.body.sauce);
    delete SauceObject._id;
    delete SauceObject._userId; 
    const sauce = new Sauce ({
        ...SauceObject, 
        userId : req.auth.userId,
        likes : 0, 
        dislikes : 0,
        usersLiked : [],
        usersDisliked :[],
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
    .then(() => res.status(201).json({message : 'Objet enregistré !'}))
    .catch(error => res.status(400).json({error}));
};

// REPONSE ATTENDUE : -PUT- met a jour la sauce avec l'id fourni 
exports.modifySauce = (req, res, next) => {
    const SauceObject = {
        name : req.body.name,
        manufacturer : req.body.manufacturer,
        description : req.body.description,
        mainPepper : req.body.mainPepper,
        heat : req.body.heat,    
    }; 
    if (req.file) {
        SauceObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    }

    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non-autorisé'});  
            }
            else {
                // si nouvelle image, il faut supprimer l'ancienne
                Sauce.updateOne({_id: req.params.id}, {...SauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié !'}))
                .catch(error => res.status(401).json({error}));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// REPONSE ATTENDUE : -GET- Renvoi un tableau de toutes les sauces de la base de données
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}));
}

// REPONSE ATTENDUE : -GET- single sauce renvoi lasauce avec l'id fourni
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({error}));
}

// REPONSE ATTENDUE : -DELETE- supprime la sauce avec l'id fourni
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if(sauce.userId != req.auth.userId){
                res.status(401).json({message : 'Non-autorisé'})
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
            })
        .catch((error) => {
            res.status(500).json({ error });
        });
  };
