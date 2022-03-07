/**
 * Schema for Job document
 */

import mongoose from "mongoose";

const { Schema, model } = mongoose;


// Job Status
export const JOB_STATUS_CREATED = 'CREATED';
export const JOB_STATUS_ASSIGNED = 'ASSIGNED';
export const JOB_STATUS_COMPLETED = 'COMPLETED';
export const JOB_STATUS = [JOB_STATUS_CREATED, JOB_STATUS_ASSIGNED, JOB_STATUS_COMPLETED];

// Stored for validation during update request
export const FIELDS_OWNER_PERMITTED_TO_UPDATE = ['title', 'clientName', 'phoneNumber', 'deliveryDate', 'pickupLocation', 'dropoffLocation', 'description', 'packageQuantity', 'price'];

const JobSchema = new Schema({
    // Client monitored attributes
    title: {
        type: String, 
        required: true,
    },
    clientName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
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

    // Server monitored attributes
    client: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String, 
        enum: JOB_STATUS,
        required: true
    },
    applicants: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        applyDate: { 
            type : Date, 
            required: true,
        }
    }],
    imageIds: [
        {
            type: String,
            required: true,
        }
    ],
    assignedDriver: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false,
    },
});

const JobModel = model('Job', JobSchema);
export default JobModel;

