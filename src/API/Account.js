const express = require("express");
const router = express.Router();
const Controller = require("../Controller/Controller_account");
const auth = require("../Middleware/Authtoken.js");

router.post("/login", async(req, res) => {
    try {
        const { Email, Password } = req.body;




        let token = await Controller.Login(Email, Password);

        res.send({ token: token });
    } catch (err) {
        console.log(err);
    }
});

// Check token by middleware
router.post("/info", auth, (req, res, ) => {
    res.send({ message: "Token Ok" });
});

module.exports = router;