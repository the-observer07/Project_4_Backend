const User = require("../models/User");
const Stall = require("../models/Stall");
const Review = require("../models/Review");
const HawkerCenter = require("../models/HawkerCenter");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const seedHawkerCenters = require("../seeds/seedHawkerCenters");
const seedUsers = require("../seeds/seedUsers");
const seedStalls = require("../seeds/seedStalls");
const seedReviews = require("../seeds/seedReviews");
const Joi = require("joi");
const UserError = require("../UserError");

module.exports.signup = async (req, res) => {
    const { name, username, password } = req.body;
    const passwordJoiSchema = Joi.object({
        password: Joi.string()
            .required()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    });

    const { error } = passwordJoiSchema.validate({ password: password });
    if (error) {
        throw new UserError(error.details[0].message, 400);
    } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, username, hashedPassword });
        await newUser.save();

        const currentUser = await User.findOne({ username: newUser.username });
        const userForToken = {
            username: currentUser.username,
            id: currentUser._id,
        };
        const token = jwt.sign(userForToken, process.env.SECRET, {
            expiresIn: 60 * 60,
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });
        res.header("Access-Control-Allow-Credentials", true);
        console.log("CREATED NEW USER");
        res.status(200).json({
            token,
            username: currentUser.username,
            name: currentUser.name,
        });
    }
};
