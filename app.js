const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;

const assignRoom = require('./assignRoom')

// use the express-static middleware
app.use(express.static("public"));
app.use(express.json());
// app.use(express.urlencoded());

// define the first route


const connectionString = "mongodb+srv://nkalia:Buddy2008@cluster0.f61r4.mongodb.net/test?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('game')
        app.get("/", function (req, res) {
            res.send("Hello World!")
        });

        app.post("/post", function (req, res) {
            console.log(req.body);
            res.send(req.body)
        });

        // start the server listening for requests
        app.listen(process.env.PORT || 8000,
            () => console.log("Server is running..."));

        app.get('/assignRoom', assignRoom.assign);
    })
    .catch(error => console.error(error))