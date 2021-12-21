const Game = require('../model/Game')
const User = require('../../users/model/User')

async function createGame(req, res){
    try{
        let {title, gameId, thumbnail, platform,genre, publisher, shortDescription} = req.body
        const foundUser = await User.findOne({email: req.user.email}).populate("favoriteGames")

        const createdGame = new Game({
            title,
            gameId,
            thumbnail,
            platform,
            genre,
            publisher,
            shortDescription,
            users : req.user.id
        })

        const filteredGame = foundUser.favoriteGames.filter(game => 
            game.gameId == gameId)
        if(filteredGame.length > 0){
            res.status(500).json({
                message: "error",
                error: "Games is already favorite"
            })
        }else{
            let savedGame = await createdGame.save()

            foundUser.favoriteGames.push(savedGame._id)

            await foundUser.save()

            res.json({message: " success"})
        }

        

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

async function getFavorites(req, res){
    try{
        const foundUser = await User.findOne({email: req.user.email}).populate("favoriteGames")

        res.json({
            message: "success",
            payload: foundUser.favoriteGames
        })

    }catch(e){
        res.status(500).json({
            message: "error",
            error: e.message
        })
    }
}


module.exports = {
    createGame,
    removeGame,
    getFavorites
}