const express = require("express");
const bodyParser = require("body-parser");
const Router = require("../Router/Routers");
require("dotenv").config();
const app = express();
var server = require("http").Server(app);
server.listen(process.env.PORT, () => {
    console.log(`Sever on ${process.env.PORT}`);
});
app.use(bodyParser.json());
app.use("/", Router);