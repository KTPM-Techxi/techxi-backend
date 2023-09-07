const moongoose = require("mongoose");
const constants = require("./const");
const bookingSchema = new moongoose.Schema(
    {
        call_center_agents_id: { type: String },
        customer_id: { type: String },
        driver_id: { type: String },
        pickup_address: { type: String },
        pickup_location: {
            latitude: { type: Number },
            longitude: { type: Number}
        },
        pickup_time: { type: Date},
        destination_address: { type: String },
        destination: {
            latitude: { type: Number},
            longitude: { type: Number}
        },
        time_completion: { type: String},
        scheduled_time: { type: Date },
        total_price: { type: Number},
        total_distance: { type: Number},
        status: { type: String, enum: Object.values(constants.BOOKING_STATUS), default: "PENDING" },
        created_at: { type: String },
        updated_at: { type: String }
    },
    { timestamps: true }
);

const Booking = moongoose.model("Booking", bookingSchema);

module.exports = { Booking };
