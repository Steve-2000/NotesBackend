const express=require("express")
const router=express.Router()
const {sendNotes,getNotes,deleteNotes,starNotes,favNotes}=require("../content/Notes")  
const verifyToken = require("../middleware/auth")

router.post("/sendNotes",sendNotes)
router.get("/getNotes/:id",getNotes)
router.delete("/deleteNotes/:id",deleteNotes)
router.put("/starNotes",starNotes)
router.get("/favouriteNotes/:id",favNotes)

module.exports=router