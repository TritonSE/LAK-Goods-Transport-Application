import mongoose from "mongoose";
const { Schema, model } = mongoose;

const JobSchema = new Schema({
    title: {
        type: String, 
        required: true,
    },
    clientName: { // TODO Confirm - Client Name should not be same as client logged in?
        type: String,
        required: true,
    },
    phoneNumber: { // TODO Confirm - Do we need a seperate phone or should it the number on record for the client?
        type: String,
        required: true,
    },
    client: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    deliveryDate: {
        type: String,
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
    description: {
        type: String,
        required: true,
    },
    packageQuantity: {
        type: Number,
        required: true,
    },
    price: {
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

const JobModel = model('Job', JobSchema);
export default JobModel;

