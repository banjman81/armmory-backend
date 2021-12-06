const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please tell us your first name!"],
        match: [/^[a-z]+$/i, "Cannot have special characters or numbers"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Please tell us your last name!"],
        match: [/^[a-z]+$/i, "Cannot have special characters or numbers"],
        trim: true,
    },
    username: {
        type: String,
        required: [true, "Please tell us your username!"],
        match: [/^[a-zA-Z0-9]*$/g, "Cannot have special characters"],
        trim: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 99,
        required: [true, "Please tell us your age!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        validate: [validator.isStrongPassword, "Please provide a strong password"],
        minlength: 8,
        trim: true,
    },
});

module.exports = mongoose.model("user", userSchema)