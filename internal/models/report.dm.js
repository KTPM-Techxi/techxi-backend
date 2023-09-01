const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        report_id: { type: String, required: true, unique: true },
        customer_id: { type: String, required: true },
        driver_report_id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: [String], required: true }
    },
    { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
