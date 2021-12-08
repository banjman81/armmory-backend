const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
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
            minlength: 8,
            validate: [validator.isStrongPassword, "Please provide a strong password"],
            trim: true,
        },
        favoriteGames: [{   
            type: mongoose.Schema.ObjectId, 
            ref: "game"
        }],
        comments: [{
            type: mongoose.Schema.ObjectId,
            ref: "comment"
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("user", userSchema)