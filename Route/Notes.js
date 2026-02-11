const express=require("express")
const router=express.Router()
const multer = require('multer');
const {sendNotes,getNotes,deleteNotes,starNotes,favNotes}=require("../content/Notes")  
const verifyToken = require("../middleware/auth")

// Configure multer for this route
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/sendNotes",verifyToken,upload.single('document'),sendNotes)
router.get("/getNotes/:id",verifyToken,getNotes)
router.delete("/deleteNotes/:id",verifyToken,deleteNotes)
router.put("/starNotes",verifyToken,starNotes)
router.get("/favouriteNotes/:id",verifyToken,favNotes)

module.exports=router