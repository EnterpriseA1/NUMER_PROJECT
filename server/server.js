const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { readdirSync, existsSync, mkdirSync } = require("fs");
const morgan = require("morgan");
const connectdb = require("./config/Dbconnect");

// Create routes directory if it doesn't exist
if (!existsSync("./routes")) {
    mkdirSync("./routes");
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectdb();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb"}));

// Load routes with error handling
try {
    readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
} catch (error) {
    console.log("No routes found or error loading routes:", error.message);
}

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});


