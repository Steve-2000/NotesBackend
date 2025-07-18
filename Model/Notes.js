const mongoose=require("mongoose")

const NotesSchema=mongoose.Schema({
    head:{
        type:String
        
    },
    description:{
        type:String
    },
    document:{
        type:String
    },
    favourite:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }   
},{timestamps:true})

    module.exports=mongoose.model("notes",NotesSchema)

    





