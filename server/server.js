const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectdb = require("./config/Dbconnect");
const routes = require("./routes/index");


connectdb() ;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb"}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();}
);

// Use all routes from index
app.use("/api", routes);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});