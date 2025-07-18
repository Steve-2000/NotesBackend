const jwt = require("jsonwebtoken");    

const verifyToken=(req,res,next)=>{
    const  tokenfirst =req.headers.authorization
    if (tokenfirst){
       
                const token=tokenfirst.split(" ")[1]
                jwt.verify(token,process.env.SECURITY_KEY,(err,decoded)=>{
                    if(err){
                        return res.json({message:'invalid token'})
                    }
                    else{
                        req.user=decoded
                        next()
                    }



                })}



    else{
        return res.json({message:"token not found"})

    }





}
module.exports=verifyToken;