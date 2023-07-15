const mongoose = require("mongoose");

const UserCredentialsSchema = new mongoose.Schema({
    user_id: {type: Number, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true, enum: Object.values(UserType)},
    status: { type: Number, enum: Object.values(STATUS) },
}, {timestamps: true});

const UserCredentials = mongoose.model("UserCredentials", UserCredentialsSchema);