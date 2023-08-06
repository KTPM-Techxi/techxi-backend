// TODO
const mongoose = require("mongoose");
const { Schema } = mongoose;
const constant = require("../../../../common/constants/constants");

const CustomerBankingSchema = new Schema({
    user_id: String,
    bank_number: String,
    active: { type: String, enum: Object.values(constant.STATUS), default: 0 }
});

const CustomerLocationsSchema = new Schema({
    user_id: String,
    longtitude: Number,
    latitude: Number,
    active: { type: String, enum: Object.values(constant.STATUS), default: 0 }
});

const CustomerBanking = mongoose.model("CustomerBanking", CustomerBankingSchema);
const CustomerLocations = mongoose.model("CustomerLocations", CustomerLocationsSchema);
module.exports = {
    CustomerBanking,
    CustomerLocations,
    STATUS: constant.STATUS
};
