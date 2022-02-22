// noinspection SpellCheckingInspection

const mongoose = require("mongoose");

const { Schema } = mongoose;

const JobSchema = new Schema({
    client: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    pickupLocation: {
        type: String,
        required: true,
    },
    dropoffLocation: {
        type: String,
        required: true,
    },
    deliveryDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    packageQuantity: {
        type: Number,
        required: true,
    },
    applicants: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: false,
        },
        {
            type: String, // Application date
            required: false,
        }
    ],
    imageIds: [
        {
            type: String,
            required: false,
        }
    ],
});

module.exports = mongoose.model("Job", JobSchema);