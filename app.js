const express = require("express");
const app = express();
const mongoose = require('mongoose')

const assignRoom = require('./assignRoom')

// use the express-static middleware
app.use(express.static("public"));
app.use(express.json());

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