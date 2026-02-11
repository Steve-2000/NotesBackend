const express=require("express")
const router=express.Router()
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {sendNotes,getNotes,deleteNotes,starNotes,favNotes}=require("../content/Notes")  
const verifyToken = require("../middleware/auth")

// Ensure uploads directory exists with better error handling
const uploadsDir = path.join(__dirname, '..', 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Created uploads directory:', uploadsDir);
  } else {
    console.log('✅ Uploads directory exists:', uploadsDir);
  }
} catch (error) {
  console.error('❌ Error creating uploads directory:', error);
}

// Configure multer with better error handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure directory exists before each upload
    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      cb(null, uploadsDir);
    } catch (error) {
      console.error('Error in multer destination:', error);
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    try {
      const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
      cb(null, uniqueName);
    } catch (error) {
      console.error('Error in multer filename:', error);
      cb(error, null);
    }
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept all file types for now
    console.log('Uploading file:', file.originalname);
    cb(null, true);
  }
});

// Multer error handling middleware
const handleMulterError = (err, req, res, next) => {
  console.error('Multer Error:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 10MB' });
    }
    return res.status(400).json({ message: 'File upload error: ' + err.message });
  } else if (err) {
    return res.status(500).json({ message: 'Server error during file upload: ' + err.message });
  }
  next();
};

router.post("/sendNotes", verifyToken, (req, res, next) => {
  console.log('📝 POST /sendNotes - Request received');
  console.log('User:', req.user);
  console.log('Body:', req.body);
  next();
}, upload.single('document'), handleMulterError, sendNotes)
router.get("/getNotes/:id",verifyToken,getNotes)
router.delete("/deleteNotes/:id",verifyToken,deleteNotes)
router.put("/starNotes",verifyToken,starNotes)
router.get("/favouriteNotes/:id",verifyToken,favNotes)

module.exports=router