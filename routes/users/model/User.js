const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique : true
        },
        email: {
            type: String,
            required: true,
            unique : true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        password: {
            type: String,
            required: true,
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