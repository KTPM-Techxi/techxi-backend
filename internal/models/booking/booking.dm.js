const moongoose = require("mongoose");
const constants = require("./const");
const bookingSchema = new moongoose.Schema(
    {
        bookings_id: { type: Number, required: true, unique: true },
        call_center_agents_id: { type: Number, required: false },
        customer_id: { type: Number, required: true },
        driver_id: { type: Number, required: true },
        pickup_location: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        },
        pickup_time: { type: Date, required: true },
        destination: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        },
        time_completion: { type: Number, required: true },
        scheduled_time: { type: Date, required: false },
        total_price: { type: Number, required: true },
        total_distance: { type: Number, required: true },
        status: { type: String, enum: Object.values(constants.BOOKING_STATUS), default: "pending" },
        created_at: { type: String, required: false },
        updated_at: { type: String, required: false }
    },
    { timestamps: true }
);

const Booking = moongoose.model("Booking", bookingSchema);

module.exports = { Booking };
