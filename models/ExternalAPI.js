const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const externalAPISchema = new Schema(
    {
        data: {},
    },
    { timestamps: true }
);

module.exports = mongoose.model("ExternalAPI", externalAPISchema);
