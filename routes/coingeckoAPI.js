// const express = require("express");
// const router = express.Router();
// const ExternalAPI = require("../models/ExternalAPI");

// router.post("/initial", async (req, res) => {
//     try {
//         console.log(req.body);
//         const data = req.body;
//         const id = data.map((i) => {
//             return i;
//         });

//         let loggedId = "";

//         const mappedArr = data.map((element, index) => {
//             // loggedId = element;
//             return element;
//         });
//         console.log("logging", mappedArr);

//         const response = await fetch(
//             `"https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30"`
//         )
//             .then((response) => response.json())
//             .then((data) => console.log(data));
//         // console.log(res);
//         // const loggedRes = await ExternalAPI.create({ res });
//         // console.log(data);
//         // res.status(200).json({ data });
//     } catch (error) {
//         console.log(error);
//     }
// });

// module.exports = router;
