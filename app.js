const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const player = require('./game/player');

const app = express();

const server = http.createServer(app);

const url = "mongodb+srv://nkalia:Buddy2008@cluster0.f61r4.mongodb.net/game?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', _ => {
    console.log('Database connected:', url)
});

db.on('error', err => {
    console.error('connection error:', err)
});

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
    console.log("new websocket connection");
    socket.emit('message', 'welcome')

    socket.on('player', async ({name}) => {
        const player_obj = await player.createPlayer(name);
        if(player_obj) {
            socket.emit('player', player_obj);
        }
    });

    socket.on('createRoom', async ({player_id})=> {
        console.log(player_id)
    });

    socket.on('joinRoom', async ({player_id, room_id})=>{
        console.log('room_id')
    })
});

const PORT = 8000 || process.env.port;

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));

