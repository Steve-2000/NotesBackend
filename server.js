const express = require('express');
const dotenv = require("dotenv").config();
const app = express();
// const cors=require("cors")
app.use(cors({
  origin: [
    "https://notes-9124a.web.app",
    "https://notes-9124a.firebaseapp.com",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


const userroute = require("./Route/User");
const notesroute= require("./Route/Notes");
const Port = process.env.PORT || 3000; // <-- FIXED
const connectdb = require("./connection/db");

connectdb();
app.use(express.json());
app.use(cors())
app.use('/', userroute);
app.use("/",notesroute)

app.listen(Port, (error) => {
    console.log(`Server is running on port ${Port}`);
});
