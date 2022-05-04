const bcrypt = require("bcrypt");
const User = require("../models/User");
const express = require("express");
const { route } = require("./portfolio");
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
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({
        username: username,
    });
    console.log(user);
    if (user === null) {
        return res.status(401).send(usernameOrPasswordError);
    }

    const result = await bcrypt.compare(password, user.hashedPassword);
    res.json("Login Successful");
    await User.findOneAndUpdate({
        username: username,
        loginStatus: true,
    });
});

// router.post("/users/status", async (req, res) => {});

// route.post("/login/status", async (req, res) => {
//     const loginStatus = await User.findOneAndUpdate({
//         username: username,
//         loginStatus: req.body,
//     });
// });

//===========================
//
// PORTFOLIO
//
//===========================

router.post("/portfolio/newentry", async (req, res) => {
    try {
        const createdEntry = await Portfolio.create(req.body);
        console.log("portfolio entry recorded", createdEntry);
        res.json({ status: "ok", message: "entry created" });
    } catch (error) {
        console.log(error);
        // res.status(401).json(usernameOrPasswordError);
    }
});

// router.get("/logout", catchAsync(userflow.logout));

//===========================
//
// WATCHLIST
//
//============================

router.post("/watchlist/newwatch", async (req, res) => {
    try {
        console.log(req.body);
        const check = await User.find(req.body); // if no similar proceed to create // if similar ?
        if (check === true) {
            res.json({ status: "error", message: "duplicate" });
        } else {
            const createdWatch = await User.create(req.body);
            console.log("Added to watchlist", createdWatch);
            res.json({ status: "ok", message: "Added to watchlist" });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
