const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
    {
        id: {
            type: String,
            required: [true, "Token is required."],
        },
        price: {
            type: Number,
            required: [true, "Price is required."],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required."],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
