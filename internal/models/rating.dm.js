const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
    {
        rating_id: { type: Number, required: true, unique: true },
        customer_id: { type: Number, required: true },
        driver_id: { type: Number, required: true },
        feedback: { type: String, required: true },
        description: { type: String, required: true },
        rate: { type: Number, required: true, min: 1, max: 5 }
    },
    { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);
