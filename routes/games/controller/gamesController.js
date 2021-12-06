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

async function removeGame(req, res){
    try{

        const removedGame = await Game.find({gameId: req.params.gameId})
        console.log(removedGame.length, '-------xx-----')
        if(removedGame.length < 1){
            res.status(500).json({
                message: "error",
                error: "Not found"
            })

        }else{
            console.log("44 game controller")
            const foundUser = await User.findOne({email: req.user.email})
    
            const deletedGame = await Game.findByIdAndDelete(removedGame[0]._id)
    
            let filteredGames = foundUser.favoriteGames.filter(
                item => item._id.toString() !== deletedGame._id.toString()
            )
    
            foundUser.favoriteGames = filteredGames
            await foundUser.save()
    
            res.json({
                message: "success",
                payload1 : deletedGame,
                payload2: foundUser
            })
        }

    }catch(err){
        res.status(500).json({
            message: "error",
            error: err.message
        })
    }
}


module.exports = {
    createGame,
    removeGame
}