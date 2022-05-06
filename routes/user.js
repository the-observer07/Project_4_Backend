const bcrypt = require("bcrypt");
const User = require("../models/User");
const express = require("express");
const { route } = require("./portfolio");
const router = express.Router();

//===========================
//
// USER
//
//===========================

// CREATE NEW USER

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

// LOGIN

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

//===========================
//
// PORTFOLIO
//
//===========================

// INPUT NEW PORTFOLIO ENTRY

router.post("/portfolio/newentry", async (req, res) => {
    try {
        const createdEntry = await User.findOneAndUpdate(
            {
                username: req.body.username,
            },
            {
                $push: {
                    portfolio: {
                        token: req.body.token,
                        price: req.body.price,
                        quantity: req.body.quantity,
                    },
                },
            }
        );
        // console.log("portfolio entry recorded", createdEntry);
        res.json({ status: "ok", message: "entry created" });
    } catch (error) {
        console.log(error);
        res.status(401).json(usernameOrPasswordError);
    }
});

// PULL ALL PORTFOLIO ENTRIES TO SHOW ON TABLE

router.post("/portfolio/pull", async (req, res) => {
    try {
        const data = await User.findOne({
            username: req.body.username,
        });
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
    }
});

// MAKING EDITS TO EXISITING PORTFOLIO ENTRIES

router.post("/portfolio/entryupdate", async (req, res) => {
    try {
        console.log(req.body);
        const editedEntry = await User.findOne({
            username: req.body.username,
        });
        res.status(200).json({ editedEntry }); // push to front end
    } catch (error) {
        console.log(error);
    }
});

// SUBMITTING EDITED ENTRIES

router.post("/portfolio/entryupdatesubmit", async (req, res) => {
    // console.log("hello");
    try {
        console.log(req.body);
        const findOne = await User.updateOne(
            {
                username: req.body.username,
                "portfolio.token": req.body.token,
            },
            {
                $set: {
                    "portfolio.$.price": req.body.price,
                    "portfolio.$.quantity": req.body.quantity,
                },
            }
        );

        res.status(200).json({ status: "ok", message: "entry updated" });
    } catch (error) {
        console.log(error);
    }
});

// DELETING PORTFOLIO ENTRY

router.post("/portfolio/removeentry", async (req, res) => {
    console.log(req.body);
    try {
        const removePorfolio = await User.findOneAndUpdate(
            { username: req.body.username },
            { $pull: { portfolio: { token: req.body.token } } }
        );
        res.json({ status: "ok", message: "entry deleted" });
        console.log(removePorfolio);
    } catch {
        res.json({ status: "error", message: "problems with deleting entry" });
    }
});

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
            // const createdWatch = await User.find({
            //     username: req.body.username,
            //     watchlist: req.body.token,
            // });

            // res.json({
            //     tokenExists: true,
            //     message: "token has been added to watchlist",
            // });
            // console.log(createdWatch);
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
        // console.log("printGETWATCH", req.body);
        const getWatch = await User.findOne({ username: req.body.username });
        // console.log("print", getWatch);
        res.status(200).json({ getWatch });
    } catch (error) {
        console.log(error);
    }
});

// REMOVING SPECIFIC TOKEN FROM WATCHLIST DATASET

router.post("/watchlist/removewatch", async (req, res) => {
    try {
        // console.log("printDELETE", req.body);
        // const { token } = req.body;
        const removedWatch = await User.findOneAndUpdate(
            { username: req.body.username },
            { $pull: { watchlist: req.body.token.toLowerCase() } }
        );
        // console.log("Removed from watchlist", removedWatch);
        res.json({ status: "ok", message: "Removed from watchlist" });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
