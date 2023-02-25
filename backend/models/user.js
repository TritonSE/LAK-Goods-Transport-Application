
/**
 * Schema for User document
 */

// const bcrypt = require("bcrypt"); Import when needed
import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const PUBLICLY_VISIBLE_FIELDS = ['firstName', 'lastName', 'phone', 'location', 'vehicleData'];
export const OWNER_LIMITED_FIELDS = ['driverLicenseId'];

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
        }
    ]
})

const UserSchema = new Schema({
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
        required: function() { return this.driverLicenseId != undefined; },
    }
}, {
    toObject: {
        transform: function(doc, ret) {
            if (ret.driverLicenseId != undefined) {
                delete ret.vehicleData._id
            }
        }
    }
}

);

const UserModel = model('User', UserSchema);

export default UserModel;
/**
 * Sniped from Octavian, may use later for auth
 *
 Following code can be used when implementing user authentication
UserSchema.pre("save", function preSave(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = bcrypt.hashSync(user.password, 10);
    }
    return next();
});

UserSchema.methods.verifyPassword = function verifyPassword(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.set("toJSON", {
    transform(doc, obj) {
        const ret = { ...obj };
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    },
});*/
