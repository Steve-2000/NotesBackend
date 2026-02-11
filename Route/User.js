const express=require("express")
const router=express.Router()
const{login,signup,getuser}=require("../content/User")

router.post("/login",login)
router.post("/signup",signup)
router.get("/user/:id",getuser)


module.exports=router