const express = require("express");
const app = express();

// use the express-static middleware
app.use(express.static("public"));
app.use(express.json());
// app.use(express.urlencoded());

// define the first route
app.get("/", function (req, res) {
  res.send("Hello World!")
});

app.post("/post", function (req, res) {
    console.log(req.body);
    res.send(req.body)
});

// start the server listening for requests
app.listen(process.env.PORT || 3000,
	() => console.log("Server is running..."));