const express = require("express");
const app = express();
const mongoose = require('mongoose');

const assignRoom = require('./game/assignRoom');
const player = require('./game/player');
const cors = require('cors');

// use the express-static middleware
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

// start the server listening for requests
app.listen(process.env.PORT || 8000,
    () => console.log("Server is running..."));

app.get('/assignRoom', assignRoom.assign);
app.post('/player', player.createPlayer);

//
// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//     .then(client => {
//         console.log('Connected to Database');
//         const db = client.db('game');
//         const room =db.collection('room')
//         app.get("/", function (req, res) {
//             res.send("Hello World!")
//         });
//
//         app.post("/post", function (req, res) {
//             room.insertOne(req.body).then(result=>console.log(result)).catch(error=>console.log(error))
//         });
//
//         // start the server listening for requests
//         app.listen(process.env.PORT || 8000,
//             () => console.log("Server is running..."));
//
//         app.get('/assignRoom', assignRoom.assign);
//     })
//     .catch(error => console.error(error))