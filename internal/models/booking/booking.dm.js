const moongoose = require("mongoose");
const constants = require("./const");
const bookingSchema = new moongoose.Schema(
    {
        call_center_agents_id: { type: String, required: false },
        customer_id: { type: String, required: true },
        driver_id: { type: String, required: true },
        pickup_location: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        },
        pickup_time: { type: Date, required: true },
        destination: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        },
        time_completion: {type: String, required: true},
        scheduled_time: { type: Date, required: false },
        total_price: { type: Number, required: true },
        total_distance: { type: Number, required: true },
        status: {type: String, enum: Object.values(constants.BOOKING_STATUS), default: "PENDING"},
        created_at: { type: String, required: false },
        updated_at: { type: String, required: false }
    },
    { timestamps: true }
);

const Booking = moongoose.model("Booking", bookingSchema);

module.exports = { Booking };
