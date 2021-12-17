const Game = require('../../games/model/Game')
const User = require('../../comments/model/Comment')

async function createComment(req, res){
    let {comment, id} = req.body

    const foundUser = await User.findOne({email: req.user.email})

    // const foundGame = await Game.findOne({gameId: id})

    try{
        console.log(req.user.email)
        res.json({
            message: "success",
            payload: foundUser
        })
    }catch(e){
        res.status(500).josn({
            message : "error",
            error : e.message
        })
    }

}

module.exports = {
    createComment,
}