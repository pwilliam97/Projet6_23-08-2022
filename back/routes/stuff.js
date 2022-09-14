const express = require ('express');
const auth = require('auth'); 
const router = express.Router();


const stuffCtrl = require('../constrollers/stuff');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

router.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message : "objet créer"
    })
})

module.exports = router;