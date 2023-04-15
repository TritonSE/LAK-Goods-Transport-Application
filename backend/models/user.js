/**
 * Schema for User document
 */

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const PUBLICLY_VISIBLE_FIELDS = [
  'firstName',
  'lastName',
  'phone',
  'location',
  'vehicleData',
];

export const OWNER_LIMITED_FIELDS = ['driverLicenseId'];

export const FIELDS_USER_PERMITTED_TO_UPDATE = [
  'firstName',
  'lastName',
  'location',
  'vehicleData',
];

export const VERIFICATION_STATUS_FIELDS = [
  'Not Applied',
  'Applied',
  'In Review',
  'Verified',
  'Disapproved',
  'Suspended',
];

export const VERIFICATION_STATUS_NOT_APPLIED = 'Not Applied';

const VehicleInformationSchema = new Schema({
  vehicleType: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehicleMake: {
    type: String,
    required: true,
  },
  vehicleColor: {
    type: String,
    required: true,
  },
  imageIds: [
    {
      type: String,
      required: true,
    },
  ],
});

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    driverLicenseId: {
      type: String,
      required: false,
    },
    vehicleData: {
      type: VehicleInformationSchema,
      required: function () {
        return this.driverLicenseId !== undefined;
      },
    },
    verificationStatus: {
      type: String,
      enum: VERIFICATION_STATUS_FIELDS,
      default: VERIFICATION_STATUS_NOT_APPLIED,
    },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        if (ret.driverLicenseId !== undefined) {
          delete ret.vehicleData._id;
        }
      },
    },
  }
);

const UserModel = model('User', UserSchema);

export default UserModel;
