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
    socket.emit('message', 'welcome');

    /**
     * When user signs in, send him player id + assign him to a room.
     * Broadcast to everyone in the room that $playername has joined.
     */
    socket.on('player', async ({name}) => {
        const player_obj = await player.createPlayer(name);
        if(player_obj) {
            socket.emit('player', player_obj);
        }
        /** 
         * If this is 4th player in the room, send a session (start signal + room)
         */
    });

    /**
     * When user sends hint, add hint to list.
     */
    socket.on('hint', () => {
        /**
         *  If this hint is #3 (last hint), broadcast hints to all player in the room
         */
    });

    /**
     * When user sends vote, add vote to list
     */
    socket.on('vote', () => {
        /**
         * If this is vote #3 -
         * 1) broadcast votes to everyone
         * 2) broadcast most voted message to everyone
         */
    });

    /**
     * When user sends guess, broadcast guess to everyone in room
     */
    socket.on('guess', ()=> {
        /**
         * If guess is correct -
         * Save room hints to scene
         * Change player types
         * send new session
         */
    })


});

const PORT = 8000 || process.env.port;

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));

