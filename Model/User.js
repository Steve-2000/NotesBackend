const mongoose=require("mongoose")

const userschema=mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    }
},{timeStramp:true})
module.exports=mongoose.model("user",userschema)