const express = require("express");
const router = express.Router();

const Manage_Account = require("../API/Account.js");

router.use("/account", Manage_Account);

module.exports = router;