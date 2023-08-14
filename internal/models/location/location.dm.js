const moongoose = require("mongoose");
const locationSchema = new moongoose.Schema({
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    coordinate: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    }
});

const Location = moongoose.model("Location", locationSchema);

module.exports = { Location };
