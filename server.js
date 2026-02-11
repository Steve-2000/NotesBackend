const express = require('express');
const dotenv = require("dotenv").config();
const app = express();
const cors=require("cors")
const path = require('path');
const multer = require('multer');

const userroute = require("./Route/User");
const notesroute= require("./Route/Notes");
const Port = process.env.PORT || 3000; // <-- FIXED
const connectdb = require("./connection/db");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

connectdb();
app.use(express.json());
app.use(cors({ 
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', userroute);
app.use("/",notesroute)

app.listen(Port, (error) => {
    console.log(`Server is running on port ${Port}`);
});