// TODO
const mongoose = require("mongoose");
const { Schema } = mongoose;
const active_const = require("../../../../common/constants");
const constant = require("./const");

const DriverBankingSchema = new Schema({
    user_id: String,
    bank_number: String,
    active: { type: String, enum: Object.values(active_const.STATUS), default: 0 }
});

const DriverLocationsSchema = new Schema({
    user_id: String,
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number] }
    },
    vehicle_number: String,
    vehicle_name: String,
    vehicle_type: { type: String, enum: Object.values(constant.VEHICLE_TYPE), default: 0 },
    active: { type: String, enum: Object.values(active_const.STATUS), default: 0 }
});

const DriverBanking = mongoose.model("DriverBanking", DriverBankingSchema);
const DriverLocations = mongoose.model("DriverLocations", DriverLocationsSchema);
module.exports = {
    DriverBanking,
    DriverLocations,
    STATUS: active_const.STATUS,
    VEHICLE_TYPE: constant.VEHICLE_TYPE
};
