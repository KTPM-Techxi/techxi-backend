const mongoose = require("mongoose");
const { Schema } = mongoose;
// TODO
const DriverSchema = new Schema({
    name: {
        type: String,
        required: true
        // unique: true
        // trim: true
    },
    email: {
        type: String,
        required: true
        // unique: true
        // trim: true
    }
});

const Driver = mongoose.model("Driver", DriverSchema);
module.exports = { Driver };
