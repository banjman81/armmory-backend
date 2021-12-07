const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
    {
        title : {
            type: String
        },
        gameId : {
            type: Number
        },
        thumbnail : {
            type: String
        },
        platform : {
            type: String
        },
        genre : {
            type: String
        },
        publisher : {
            type: String
        },
        shortDescription : {
            type: String
        },
        users : {
            type : mongoose.Schema.ObjectId,
            ref: "user"
        },
        comments : [{
            type : mongoose.Schema.ObjectId,
            ref: "comment"
        }]
    },{
        timestamps: true
    }
)

module.exports = mongoose.model("game", gameSchema)