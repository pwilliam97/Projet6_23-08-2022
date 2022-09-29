const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => {
    try {
        console.log('auth')
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        }; 
        console.log(userId)
        next();
    } catch (error){
        console.log(error)
        res.status(401).json({error});
    }
}