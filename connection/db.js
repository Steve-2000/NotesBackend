const mongoose=require("mongoose")
// const dotenv=require("dotenv").config()
connectdb=()=>{
    mongoose.connect(process.env.CONNECTION_URL, {
        dbName: 'notesApp'
    })
    .then((res)=>{
        console.log("✅ Database connected successfully")
    }
)
.catch((err)=>{
    console.log("❌ Database connection error:", err.message)
    console.log("Please check:")
    console.log("1. MongoDB Atlas cluster is running (not paused)")
    console.log("2. IP address is whitelisted in Network Access")
    console.log("3. Database credentials are correct")
})
}
module.exports=connectdb