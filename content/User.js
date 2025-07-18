const structure=require("../Model/User")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require("dotenv").config()

const signup=async(req,res)=>{
    const{email,password}=req.body
       if(email==="" || password===""){   
        return res.status(400).json({message:"email and password are required"})
    }


    if(email && password){
        const emailin=await structure.findOne({email})
        if(!emailin){
            const hpw=await bcrypt.hash(password,10)
         const newuser=   await structure.create({email,password:hpw})
        
            token=jwt.sign({email,id:newuser._id},process.env.SECURITY_KEY)
            return res.status(201).json({token,user:newuser})




        }
        else{
            return res.status(400).json({message:"mail already there"})
    }



    }
    else{
        return res.send("require both email and passord")
    }
}


const login=async(req,res)=>{
    const{email,password}=req.body
     if(email==="" || password===""){   
        return res.status(400).json({message:"email and password are required"})
    }
    const userexit=await structure.findOne({email})

   

    if(email){
        if(userexit && await bcrypt.compare(password,userexit.password)){
            const token= jwt.sign({email,id:userexit._id},process.env.SECURITY_KEY)
            return res.status(200).json({token,user:userexit})
         }
        else{
            return res.status(400).json({message:"invalid email or password"})

    }}
    else{
        return res.status(400).json({message:"email not found"})
    }

}

const getuser=async(req,res)=>{
      const user= await structure.findById(req.params.id)
    return  res.status(200).json({email:user.email})
}

module.exports={login,signup,getuser}