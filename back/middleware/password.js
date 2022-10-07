//importation password validator 
const passwordValidator = require ('password-validator'); 

//création du schéma 
const passwordSchema = new passwordValidator(); 

passwordSchema
.is().min(8)
.is().max(100)
.has().uppercase(1)
.has().lowercase()
.has().digits(2)
.has().not().spaces()

//vérification de la qualité du password par rapport au schéma
module.exports = (req, res, next) => {
if (passwordSchema.validate(req.body.password)){
    next()
} else {
    return res.status(400).json({error : "Le mot de passe n'est pas assez fort :"+ passwordSchema.validate('req.body.password', {list : true})})
}
}
