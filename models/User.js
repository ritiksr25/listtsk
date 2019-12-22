const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String
        },
        role: {
            type: String,
            default: "user"
        }
    },
    { timestamps: true }
);

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        {
            id: this._id,
            name: this.name,
            email: this.email,
            role: this.role
        },
        process.env.JWT_PRIVATE_KEY
    );
    return token;
};

module.exports = User = mongoose.model("User", UserSchema);
