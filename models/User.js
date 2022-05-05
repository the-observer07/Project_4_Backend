const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
        },
        username: {
            type: String,
            required: true,
            unique: [true, "That username is already taken."],
        },
        hashedPassword: {
            type: String,
            required: [true, "Password is required."],
        },
        watchlist: [
            String,
            // required: [true],
        ],

        portfolio: [{ token: String, price: Number, quantity: Number }],

        loginStatus: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
userSchema.set("toJSON", { virtuals: true });
