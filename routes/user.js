const bcrypt = require("bcrypt");
const User = require("../models/User");
const express = require("express");
const { route } = require("./portfolio");
const router = express.Router();

router.post("/newuser", async (req, res) => {
    try {
        const checkUser = await User.findOne({ username: req.body.username });
        if (checkUser) {
            return res.json({ created: false, message: "Username is taken" });
        }
        req.body.hashedPassword = await bcrypt.hash(req.body.password, 12);
        const createdUser = await User.create(req.body);
        console.log("created user is: ", createdUser);
        res.json({ created: true, status: "ok", message: "user created" });
    } catch (error) {
        console.log(error);
        res.status(401).json("usernameOrPasswordError");
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

// INPUT NEW WATCHLIST TOKEN

router.post("/watchlist/newwatch", async (req, res) => {
    try {
        console.log(req.body);
        const createdWatch = await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { watchlist: req.body.token } }
        ); // if no similar proceed to create // if similar ?
        // if (check === true) {
        //     res.json({ status: "error", message: "duplicate" });
        // } else {
        //     const createdWatch = await User.findOneAndUpdate(
        //         { username: req.body.token.username },
        //         { token: req.body.token.token }
        //     );
        console.log("Added to watchlist", createdWatch);
        res.json({ status: "ok", message: "Added to watchlist" });
    } catch (error) {
        console.log(error);
    }
});

// RETRIEVE ALL WATCHLIST DATA FOR RENDERING ON FRONTEND

router.post("/watchlist/getwatch", async (req, res) => {
    try {
        console.log("printGETWATCH", req.body);
        const getWatch = await User.findOne({ username: req.body.username });
        console.log("print", getWatch);
        res.status(200).json({ getWatch });
    } catch (error) {
        console.log(error);
    }
});

// REMOVING SPECIFIC TOKEN FROM WATCHLIST DATASET

router.post("/watchlist/removewatch", async (req, res) => {
    try {
        console.log("printDELETE", req.body);
        // const { token } = req.body;
        const removedWatch = await User.findOneAndUpdate(
            { username: req.body.username },
            { $pull: { watchlist: req.body.token.toLowerCase() } }
        );
        console.log("Removed from watchlist", removedWatch);
        res.json({ status: "ok", message: "Removed from watchlist" });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
