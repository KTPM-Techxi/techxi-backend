const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
    {
        customer_id: { type: String, required: true },
        driver_id: { type: String, required: true },
        feedback: { type: String, required: true },
        description: { type: String, required: true },
        rate: { type: Number, required: true, min: 1, max: 5 }
    },
    { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);
