const express = require("express");
const app = express();
const mongoose = require('mongoose');

const room = require('./game/room');
const player = require('./game/player');
const cors = require('cors');

// use the express middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));


const url = "mongodb+srv://nkalia:Buddy2008@cluster0.f61r4.mongodb.net/game?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', _ => {
    console.log('Database connected:', url)
});

db.on('error', err => {
    console.error('connection error:', err)
});

app.listen(process.env.PORT || 8000,
    () => console.log("Server is running..."));

app.post('/createRoom', room.createRoom);
app.post('/addToRoom', room.addToRoom);
app.post('/player', player.createPlayer);
