const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
    console.log("new websocket connection");
    socket.emit('message', 'welcome')

    // socket.on('player', ({name}) => {
    //     console.log("make player")
    // })
});

const PORT = 8000 || process.env.port;

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))