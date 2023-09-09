const mongoose = require("mongoose");
const { Schema } = mongoose;
const constant = require("./const");
const UserSchema = new Schema({
    name: String,
    phone_number: String,
    email: String,
    address: String,
    dob: Date,
    avatar_url: String,
    role: { type: String, enum: Object.values(constant.USER_TYPES) },
    already_account: { type: Number, enum: Object.values(constant.ALREADY_ACCOUNT) },
    fcmToken: String
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
    ROLE: constant.USER_TYPES
};
