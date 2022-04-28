const express = require("express"); //from documentation: express is function
const connectDB = require("./db");
const app = express(); //app is an object
require("dotenv").config();
const user = require("./routes/user");
const portfolio = require("./routes/portfolio");
const watchlist = require("./routes/watchlist");
var cors = require("cors");

connectDB(process.env.MONGODB_URI);

console.log(process.env.PORT);
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", user);
app.use("/portfolio", portfolio);
app.use("/watchlist", watchlist);

app.listen(port, () => {
    console.log("I am listening on port", port);
});

app.get("/", (req, res) => {
    res.json("hello");
});

////////////////////////
///  USER RELATED   ///
//////////////////////
// app.post("/newuser", (req, res) => {
//     res.json("New User Created");
// });

// app.post("/login", (req, res) => {
//     res.json("Login successful");
// });

/////////////////////////////
///  WATCHLIST RELATED   ///
///////////////////////////

// app.post("/newwatch", (req, res) => {
//     res.json("Added successfully");
// });

// app.delete("/removewatch", (req, res) => {
//     res.json("Removed successfully");
// });

/////////////////////////////
///  PORTFOLIO RELATED   ///
///////////////////////////

// app.post("/newentry", (req, res) => {
//     res.json("New entry created");
// });

// app.patch("/entryupdate", (req, res) => {
//     res.json("Entry updated");
// });

// app.delete("/removeentry", (req, res) => {
//     res.json("Entry deleted");
// });
