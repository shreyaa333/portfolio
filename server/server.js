require("dotenv").config({ path: "./server/.env" });

console.log("Current folder:", process.cwd());
console.log("Mongo URI:", process.env.MONGODB);
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // serves index.html, style.css, script.js

// ---------- Connect to MongoDB Atlas ----------
mongoose.connect(process.env.MONGODB)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// ---------- Message schema ----------
const messageSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, lowercase: true, trim: true },
  subject: { type: String, default: 'Portfolio contact' },
  message: { type: String, required: true },
  sentAt:  { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// ---------- POST /api/contact — save a new message ----------
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    console.log('New message from:', name, `<${email}>`);
    res.status(201).json({ success: true, message: 'Message saved!' });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// ---------- GET /api/messages — view all saved messages ----------
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ sentAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch messages.' });
  }
});

// ---------- Health check ----------
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
