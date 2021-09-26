const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Router = require("../Router/Router");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());

var server = require("http").Server(app);

server.listen(process.env.PORT, () => {

    console.log(`Sever on ${process.env.PORT}`);
});


app.use("/", Router);