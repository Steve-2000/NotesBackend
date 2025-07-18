const mongoose=require("mongoose")
// const dotenv=require("dotenv").config()
connectdb=()=>{
    mongoose.connect(process.env.CONNECTION_URL)
    .then((res)=>{
        console.log("connected db")
    }
)
.catch((err)=>{
    console.log("err connect",err)

})
}
module.exports=connectdb