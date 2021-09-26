const express = require("express");
const router = express.Router();

const Manage_Student = require("../API/Student")





router.use("/student", Manage_Student)




module.exports = router;