const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const player = require('./game/player');
const session = require('./game/session');
const vote = require('./game/vote');

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

    socket.on('hint', ({player, session, hint}) => {
        socket.emit('receive_hint', 'happy')
    });

    /**
     * When user signs in, send him player id + assign him to a room.
     * Broadcast to everyone in the room that $playername has joined.
     */
    socket.on('player', async ({name}) => {
        const {player_obj, room} = await player.createPlayer(name);
        if(player_obj && room) {
            console.log(room._id)

            socket.join(room._id.toString());
            /**
             * Braodcast this player's details to himself
             */
            socket.emit('player', {player_obj, room});
            /**
             * Broadcast to all players in the room about new join
             */
            io.in(room._id.toString()).emit('join', {player_obj, room});
            // socket.broadcast.emit('join', 'obj');

            /**
             * If this is 4th player in the room, send a session (start signal + room)
             */
            if(room.players.length === 4) {
            // if(true){
                const {updated_room, new_session} = await session.newSession(room._id);
                console.log(new_session);
                io.in(room._id.toString()).emit('session', new_session);
            }
        }

    });

    /**
     * When user sends hint, add hint to list.
     */
    // socket.on('hint', (player, session, round, hint_id, hint) => {
    //     const {round, sent_hint} = session.addHint(player, round_id, hint_id, hint);
    //     socket.emit('yourHint', sent_hint);
    //     /**
    //      *  If this hint is #3 (last hint), broadcast hints to all player in the room
    //      */
    //     if(round.hints.length === 3) {
    //         socket.to(room_id).broadcast('hint', round.hints)
    //     }
    // });

    /**
     * When user sends vote, add vote to list
     */
    socket.on('vote', (hint_id, room_id, round_id) => {
        const round = vote.saveVote(hint_id, round_id);
        /**
         * If this is vote #3 -
         * 1) broadcast votes to everyone
         * 2) broadcast most voted message to everyone
         */
        if(round.votes === 3) {
            socket.to(room_id).broadcast('votes', round.hints);
        }
    });

    /**
     * When user sends guess, broadcast guess to everyone in room
     */
    socket.on('guess', (guess, room_id, correct)=> {
        socket.to(room_id).broadcast(guess);
        if(!correct) {
            //create new round and broadcast
        }
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

