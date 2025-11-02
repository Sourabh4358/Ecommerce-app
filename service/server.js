const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');


const PORT = 5000;
const mongoURI = 'mongodb+srv://sourabhvasedar_db_user:pFVNJJi3uU0zhXFG@ecommerce-app.yt0stgp.mongodb.net/';
const app = express();
// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use( cors({
    origin:'http://localhost:5173/',
    methods:['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expire",
        "Pragma",
    ],
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));