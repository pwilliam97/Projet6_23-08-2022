//Importation app express 
const express = require ('express'); 

//importation des routes 
const router = express.Router();

//importation des controler
const userControler = require('../controllers/user');

router.post('/signup', userControler.signup);
router.post('/login', userControler.login);



module.exports = router;