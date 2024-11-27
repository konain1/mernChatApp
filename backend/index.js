const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const chats = require('./data/chatData');
const connectDB = require('./config/db');
const app = express();
const userRoute = require('./route/userRoute');
const chatRoute = require('./route/chatRoute');
const messageRoute = require('./route/messageRoute');
const socketIo = require('socket.io');

// Connect to the database
connectDB();

// Port setup
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);

// Start server
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Socket.io setup
const io = socketIo(server, {
  pingTimeout: 60000,  
  cors: { origin: `http://localhost:${port}` },
});

// Socket connection
io.on("connection", (socket) => {
  console.log('Connection socket established');

  socket.on('setup',(userData)=>{
    console.log('Connection setup');
    socket.join(userData._id)
    socket.emit('connected')
  })
  socket.on('join room',(roomId)=>{
    console.log('joined at ',roomId)
    socket.join(roomId)
  })
  socket.on('new message',(NewMessageRecieved)=>{
    let chat = NewMessageRecieved.chat;

    if(!chat.users) return console.log('users not available for chat')

      chat.users.forEach(user => {
        
        if(user._id == NewMessageRecieved.sender._id) return

        socket.in(user._id).emit('message recieved',NewMessageRecieved)
      });
  })
  socket.off('setup',()=>{
    console.log('user disconnected')
    socket.leave(userData._id)
  })
});

