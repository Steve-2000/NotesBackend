const express = require('express');
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors")
const path = require('path');

const userroute = require("./Route/User");
const notesroute = require("./Route/Notes");
const Port = process.env.PORT || 5000;
const connectdb = require("./connection/db");

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

connectdb();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data

// CORS Configuration
app.use(cors({
  origin: [
    "https://notes-9124a.web.app",
    "https://notes-9124a.firebaseapp.com",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Notes API is running',
    timestamp: new Date().toISOString(),
    env: {
      port: Port,
      nodeEnv: process.env.NODE_ENV || 'development',
      hasSecurityKey: !!process.env.SECURITY_KEY,
      hasDbConnection: !!process.env.CONNECTION_URL
    }
  });
});

app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Notes Backend API',
    version: '1.0.0'
  });
});

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/', userroute);
app.use("/", notesroute)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware - MUST be last
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  console.error('Error stack:', err.stack);
  
  // Don't send stack trace in production
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.stack : 'Something went wrong'
  });
});

app.listen(Port, () => {
    console.log(`🚀 Server is running on port ${Port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`SECURITY_KEY configured: ${!!process.env.SECURITY_KEY}`);
    console.log(`DATABASE configured: ${!!process.env.CONNECTION_URL}`);
});