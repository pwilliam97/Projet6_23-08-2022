const express = require ('express');
const auth = require('../middleware/auth'); 
const multerConfig = require('../middleware/multer-config');

const router = express.Router();

const Sauce = require ('../models/sauces')

const sauceCtrl = require('../controllers/sauce')
const likeCtrl = require ('../controllers/like')


// REPONSE ATTENDUE : -GET- Renvoi un tableau de toutes les sauces de la base de données
router.get('/', auth, multerConfig, sauceCtrl.getAllSauce);

// REPONSE ATTENDUE : -POST- envoi toute les données fournis a la base de données 
router.post('/', auth, multerConfig, sauceCtrl.createSauce);

// REPONSE ATTENDUE : -GET- single sauce renvoi lasauce avec l'id fourni
router.get('/:id', auth, sauceCtrl.getOneSauce);

// REPONSE ATTENDUE : -PUT- met a jour la sauce avec l'id fourni 
router.put('/:id', auth, multerConfig, sauceCtrl.modifySauce);

// REPONSE ATTENDUE : -DELETE- supprime la sauce avec l'id fourni
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//REPONSE ATTENDUE : -POST- définit les likes 
router.post('/:id/like', auth, likeCtrl.likeUser);

module.exports = router;