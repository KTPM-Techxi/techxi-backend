const mongoose = require("mongoose");
const { Schema } = mongoose;
const constant = require("./const");
const UserSchema = new Schema({
    name: String,
    phoneNumber: String,
    email: String,
    address: String,
    dob: Date,
    role: { type: String, enum: Object.values(constant.USER_TYPES) }
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
    ROLE: constant.USER_TYPES
};
