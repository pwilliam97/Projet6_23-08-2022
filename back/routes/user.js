//Importation app express 
const express = require ('express'); 

//importation password email validator
const password = require('../middleware/password');
const email = require('../middleware/email')
//importation des routes 
const router = express.Router();

//importation des controler
const userControler = require('../controllers/user');

router.post('/signup', email, password, userControler.signup);
router.post('/login', userControler.login);



module.exports = router;