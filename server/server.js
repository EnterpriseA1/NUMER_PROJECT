const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectdb = require("./config/Dbconnect");
const routes = require("./routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectdb();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb"}));

// Use all routes from index
app.use("/api", routes);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});