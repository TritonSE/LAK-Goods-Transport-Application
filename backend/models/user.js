const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    password: {
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
    jobIds: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Job",
            required: false,
        },
    ],
});

/**
 * Sniped from Octavian, may use later for auth
 *
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

module.exports = mongoose.model("User", UserSchema);