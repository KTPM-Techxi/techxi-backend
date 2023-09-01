const mongoose = require("mongoose");
const appConst = require("../../../common/constants");
const { Schema } = mongoose;

const UserCredentialsSchema = new Schema({
    user_id: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Number, enum: Object.values(appConst.STATUS), default: 0 }
});

const UserCredential = mongoose.model("UserCredential", UserCredentialsSchema);

module.exports = { UserCredential };
