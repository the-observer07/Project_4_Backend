const Watchlist = require("../models/Watchlist");
const express = require("express");
const router = express.Router();

router.post("/newwatch", async (req, res) => {
    try {
        console.log(req.body);
        const check = await Watchlist.find(req.body); // if no similar proceed to create // if similar ?
        const createdWatch = await Watchlist.create(req.body);
        console.log("Added to watchlist", createdWatch);
        res.json({ status: "ok", message: "Added to watchlist" });
    } catch (error) {
        console.log(error);
    }
});

router.get("/getwatch", async (req, res) => {
    try {
        const getWatch = await Watchlist.find({});
        console.log(getWatch);
        res.status(200).json({ getWatch });
    } catch (error) {
        console.log(error);
    }
});

router.delete("/removewatch", async (req, res) => {
    try {
        const { token } = req.body;
        const removedWatch = await Watchlist.deleteOne({ token });
        console.log("Removed from watchlist", removedWatch);
        res.json({ status: "ok", message: "Removed from watchlist" });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
