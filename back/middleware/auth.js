const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv')
const result = dotenv.config()

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.YOUR_TOKEN);
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