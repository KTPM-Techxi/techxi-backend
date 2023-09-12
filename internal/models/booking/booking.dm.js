const moongoose = require("mongoose");
const { BOOKING_STATUS } = require("./const");
const { VEHICLE_TYPE } = require("../../models/user/driver/const");
const bookingSchema = new moongoose.Schema({
    call_center_agents_id: { type: String },
    customer_id: { type: String },
    driver_id: { type: String },
    vehicle_type: { type: String, enum: Object.values(VEHICLE_TYPE) },
    pickup_address: { type: String },
    pickup_location: {
        latitude: { type: Number },
        longitude: { type: Number }
    },
    pickup_time: { type: Date },
    destination_address: { type: String },
    destination: {
        latitude: { type: Number },
        longitude: { type: Number }
    },
    time_completion: { type: String },
    scheduled_time: { type: Date },
    total_price: { type: Number },
    total_distance: { type: String },
    status: { type: String, enum: Object.values(BOOKING_STATUS), default: "PENDING" },
    created_at: { type: String },
    updated_at: { type: String }
});

const Booking = moongoose.model("Booking", bookingSchema);

module.exports = { Booking, BOOKING_STATUS };
