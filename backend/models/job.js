/**
 * Schema for Job document
 */

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Job Status
export const JOB_STATUS_CREATED = 'CREATED';
export const JOB_STATUS_ASSIGNED = 'ASSIGNED';
export const JOB_STATUS_COMPLETED = 'COMPLETED';
export const JOB_STATUS = [
  JOB_STATUS_CREATED,
  JOB_STATUS_ASSIGNED,
  JOB_STATUS_COMPLETED,
];

// Stored for validation during update request
export const FIELDS_OWNER_PERMITTED_TO_UPDATE = [
  'title',
  'clientName',
  'phoneNumber',
  'deliveryDate',
  'pickupLocation',
  'dropoffLocation',
  'description',
  'packageQuantity',
  'price',
];
export const OWNER_LIMITED_FIELDS = [
  // 'applicants',
  // 'assignedDriverId',
  'startDate',
];

const JobSchema = new Schema(
  {
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
    receiverName: {
      type: String,
      required: false,
    },
    receiverPhoneNumber: {
      type: String,
      required: false,
    },
    deliveryDate: {
      type: String,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    pickupDistrict: {
      type: String,
      required: true,
    },
    dropoffLocation: {
      type: String,
      required: true,
    },
    dropoffDistrict: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    packageQuantity: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },

    // Server monitored attributes
    client: {
      type: String,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: JOB_STATUS,
      required: true,
    },
    applicants: [
      {
        userId: {
          type: String,
          ref: 'User',
          required: true,
        },
        applyDate: {
          type: Date,
          required: true,
        },
      },
    ],
    imageIds: [
      {
        type: String,
        required: true,
      },
    ],
    assignedDriverId: {
      type: String,
      ref: 'User',
      required: false,
    },
    startDate: {
      type: Date,
      required: false,
    },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret.__v;
        ret.applicants.forEach((applicant) => delete applicant._id);
      },
    },
  }
);

// Index to optimize owned job search for clients
JobSchema.index({ client: 1 });

// Index to enable job search
JobSchema.index({
  title: 'text',
  pickupLocation: 'text',
  dropoffLocation: 'text',
  deliveryDate: 'text',
  description: 'text',
});

const JobModel = model('Job', JobSchema);
export default JobModel;
