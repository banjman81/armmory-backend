const Game = require('../model/Game')
const User = require('../../users/model/User')

async function createGame(req, res){
    try{
        let {title, gameId, thumbnail, platform,genre, publisher, shortDescription} = req.body
        const foundUser = await User.findOne({email: req.user.email})

        const createdGame = new Game({
            title,
            gameId,
            thumbnail,
            platform,
            genre,
            publisher,
            shortDescription,
            user : req.user.id
        })

        let savedGame = await createdGame.save()

        foundUser.favoriteGames.push(savedGame._id)

        await foundUser.save()

        res.json({message: " success", payload : savedGame})

    }catch(err){
        res.status(500).json({ message: "error", error: err.message });
    }
}


module.exports = {
    createGame
}