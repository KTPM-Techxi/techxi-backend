// TODO
const mongoose = require("mongoose");
const { Schema } = mongoose;
const constant = require("../../../../common/constants");

const CustomerBankingSchema = new Schema({
    user_id: String,
    bank_number: String,
    active: { type: String, enum: Object.values(constant.STATUS), default: 0 }
});

const CustomerLocationsSchema = new Schema({
    user_id: String,
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] }
    },
    active: { type: String, enum: Object.values(constant.STATUS), default: 0 }
});

const CustomerBanking = mongoose.model("CustomerBanking", CustomerBankingSchema);
const CustomerLocations = mongoose.model("CustomerLocations", CustomerLocationsSchema);
module.exports = {
    CustomerBanking,
    CustomerLocations,
    STATUS: constant.STATUS
};
