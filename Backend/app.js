// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http'); 
const socketIo = require('socket.io'); 
const { url } = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', require('./routes/authRoutes'));

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/message', require('./routes/messageRoutes'));

// ... (rest of the code)

// WebSocket setup
io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle real-time messaging here
    socket.on('message', (data) => {
      // Broadcast the message to all connected clients
      io.emit('message', data);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
  
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });