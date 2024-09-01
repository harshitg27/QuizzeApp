const jwt = require('jsonwebtoken');

const verifyToken = (req , res , next) =>{
    try{
        const token = req.header('Authorization').split(' ')[1] ;
        if(!token){
            return res.status(401).json({
                status: 'Failed',
                message: 'Token Not Found'
            })
        }
        const decoded = jwt.verify(token , process.env.JWT_Private_Key) ;
        req.user_id = decoded.id ;
        next()
    }catch(error){
        return res.status(401).json({
            status: 'Failed',
            message: 'Token Not Found or Invalid Token ',
            error
        })
    }
    
}

module.exports = verifyToken ;