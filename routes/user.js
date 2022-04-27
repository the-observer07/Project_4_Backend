const bcrypt = require("bcrypt");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

router.post("/newuser", async (req, res) => {
    try {
        req.body.hashedPassword = await bcrypt.hash(req.body.password, 12);
        const createdUser = await User.create(req.body);
        console.log("created user is: ", createdUser);
        res.json({ status: "ok", message: "user created" });
    } catch (error) {
        console.log(error);
        // res.status(401).json(usernameOrPasswordError);
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user === null) {
        return res.status(401).send(usernameOrPasswordError);
    }

    const result = await bcrypt.compare(password, user.password);
});

// router.get("/logout", catchAsync(userflow.logout));

//// SEEDING USERS
// router.get("/seed/seedAll", userflow.seedAll);

module.exports = router;
