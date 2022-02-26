
/**
 * Model to represent User data
 */

// const bcrypt = require("bcrypt"); Import when needed
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
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
    jobIds: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Job",
            required: false,
        },
    ],
});

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
