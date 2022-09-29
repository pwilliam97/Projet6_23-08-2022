const Sauce = require('../models/sauces')
const auth = require ('../models/user')

exports.likeUser = (req, res, next) => {  
    console.log(req.body) 
    console.log(req.params)
    console.log({_id : req.params.id})
    auth
    // // récupérer la sauce sauce.findOne req.params.id
    Sauce.findOne({_id : req.params.id})
    if(req.body.like === 1){
            // 1. vérifier si l'utilsateur a déjà voté
            // - est-ce que l'utilisateur est dans usersLiked ?
            // - est-ce que l'utilisateur est dans usersDisliked ? 
            if( !Sauce.usersLiked.includes(req.body.userId) || !Sauce.usersDisliked.includes(req.body.userId)){
                // 2. si l'utilisateur n'a pas voté
                // - likes +1
                // - ajoute dans usersLiked
                Sauce.updateOne({_id: req.params.id},{$inc:{likes:+1},$push:{usersLiked : req.body.userId}})
                    .then(() => res.status(200).json({message:"Sauce Liker"}))
                    .catch(error => res.status(400).json(error))
            } else {
                // 3. sinon erreur
                console.log("ok")
                res.status(200).json(Sauce)
            }
    }


    
    // si like = -1
    // pareil que le like sauf le 2.
    if(req.body.like === -1){
        // 1. vérifier si l'utilsateur a déjà voté
        // - est-ce que l'utilisateur est dans usersLiked ?
        // - est-ce que l'utilisateur est dans usersDisliked ? 
        if( !Sauce.usersLiked.includes(req.body.userId) || !Sauce.usersDisliked.includes(req.body.userId)){
            // 2. si l'utilisateur n'a pas voté
            // - likes +1
            // - ajoute dans usersLiked
            Sauce.updateOne({_id: req.params.id},{$inc:{dislikes:+1},$push:{usersDisliked : req.body.userId}})
                .then(() => res.status(200).json({message:"Sauce Disliker"}))
                .catch(error => res.status(400).json(error))
        } else {
            // 3. sinon erreur
            console.log("ok")
            res.status(200).json(Sauce)
        }
    }

        // si like = 0
        if(req.body.like === 0){
            // 1. est-ce que l'utilisateur est dans usersLiked ?
            // - likes -1
            // - retire de usersLiked
            if( Sauce.usersLiked.includes(req.body.userId) ){
                Sauce.updateOne({_id: req.params.id},{$inc:{like:-1},$pull:{usersLiked : req.body.userId}})
                    .then(() => res.status(200).json({message:"Like retiré"}))
                    .catch(error => res.status(400).json(error))

                        // 2. est-ce que l'utilisateur est dans usersDisliked ? 
                        // - dislikes -1
                        // - retire de usersDisliked
                    if(Sauce.usersDisliked.includes(req.body.userId) ){
                        Sauce.updateOne({_id: req.params.id},{$inc:{dislike:-1},$pull:{usersDisliked : req.body.userId}})
                        .then(() => res.status(200).json({message:"Dislike retiré"}))
                        .catch(error => res.status(400).json(error))
                    }
            }
        }
}



    



   



    // 1. est-ce que l'utilisateur est dans usersLiked ?
    // - likes -1
    // - retire de usersLiked
    // 2. est-ce que l'utilisateur est dans usersDisliked ? 
    // - dislikes -1
    // - retire de usersDisliked





    // //like = +1 
    // if (req.body.like === 1) {
    //     Sauce.updateOne({_id: req.params.id},{$inc:{likes:+1},$push:{usersLiked : req.body.userId}})
    //     .then(() => res.status(200).json({message:"Sauce Liker"}))
    //     .catch(error => res.status(400).json(error))
    // }

    // // like = 0 
    // if (req.body.like === 0) {
    //     Sauce.updateOne({_id: req.params.id},{$inc:{likes:-1},$pull:{usersLiked : req.body.userId}})
    //     .then(() => {
    //         return Sauce.updateOne(
    //             { _id: req.params.id },
    //             { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
    //         );
    //     })
    //     .then(() => {
    //         res.status(200).json({ message: ['Like retiré', 'Dislike retiré'] });
    //     })
    //     .catch((error) => res.status(400).json(error));
    // }

    // //like =-1 
    // if (req.body.like === -1) {
    //     Sauce.updateOne({_id: req.params.id},{$inc:{dislikes:+1},$push:{usersDisliked : req.body.userId}})
    //         .then(() => res.status(200).json({message:"Sauce Disliker"}))
    //         .catch(error => res.status(400).json(error))
    // }
