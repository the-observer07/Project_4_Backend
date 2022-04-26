const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    token: {
        type: string,
        required: [true, "Token is required."],
    },
});

module.exports = mongoose.model("Watchlist", watchlistSchema);
