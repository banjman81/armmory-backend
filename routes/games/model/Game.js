const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
    {
        title : {
            type: String
        },
        id : {
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
        user : {
            type : mongoose.Schema.ObjectId,
            ref: "user"
        }
    },{
        timestamps: true
    }
)

module.exports = mongoose.model("game", gameSchema)