const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config(); // ✅ Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// ✅ Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors({
  origin: 'http://localhost:5173', // ❌ remove trailing slash
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expire",
    "Pragma",
  ],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`));
