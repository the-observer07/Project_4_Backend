const Portfolio = require("../models/Portfolio");
const express = require("express");
const router = express.Router();

router.get("/pull", async (req, res) => {
    try {
        const data = await Portfolio.find({});
        // .limit(10)
        // .sort({ updatedAt: -1 })
        // .populate("author", { name: 1 })
        // .populate("img", { url: 1 })
        // .populate("location", { centerName: 1 });
        console.log(data);
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
    }
});

router.post("/newentry", async (req, res) => {
    try {
        const createdEntry = await Portfolio.create(req.body);
        console.log("portfolio entry recorded", createdEntry);
        res.json({ status: "ok", message: "entry created" });
    } catch (error) {
        console.log(error);
        // res.status(401).json(usernameOrPasswordError);
    }
});

router.patch("/entryupdate", async (req, res) => {
    try {
        const editedEntry = await Portfolio.findOne(req.body);
        console.log(editedEntry);
        res.json({ status: "ok", message: "entry edited" });
    } catch (error) {
        console.log(error);
    }
});

router.post("/removeentry", async (req, res) => {
    // const deleteEntry = await Portfolio.deleteOne(req.body);
    console.log(JSON.stringify(req.body));
    // const { token } = req.body;
    // const message = await Portfolio.deleteOne({ token });

    // if (message.deletedCount === 1) {
    //     res.json({ status: "ok", message: "entry deleted" });
    // } else {
    //     res.json({ status: "error", message: "problems with deleting entry" });
    // }
});

module.exports = router;
