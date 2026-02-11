const jwt = require("jsonwebtoken");    

const verifyToken=(req,res,next)=>{
    try {
        const tokenfirst = req.headers.authorization
        
        if (!tokenfirst){
            console.log('❌ No authorization header');
            return res.status(401).json({message:"Authorization header is missing"})
        }
        
        const token = tokenfirst.split(" ")[1]
        
        if (!token) {
            console.log('❌ No token found in authorization header');
            return res.status(401).json({message:"Token not found"})
        }
        
        jwt.verify(token, process.env.SECURITY_KEY, (err, decoded) => {
            if(err){
                console.log('❌ Token verification failed:', err.message);
                return res.status(401).json({message:'Invalid or expired token'})
            }
            console.log('✅ Token verified for user:', decoded);
            req.user = decoded
            next()
        })
    } catch (error) {
        console.error('❌ Error in auth middleware:', error);
        return res.status(401).json({message:"Invalid authorization format"})
    }
}

module.exports=verifyToken;