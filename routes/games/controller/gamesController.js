const Game = require('../model/Game')

async function createGame(req, res){
    try{
        let {title, id, thumbnail, platform, publisher, shortDescription} = body.req
        
        const createdGame = new Game({
            title,
            id,
            thumbnail,
            platform,
            genre,
            publisher,
            shortDescription,
            user
        })

    }catch(err){
        res.status(500).json({ message: "error", err });
    }
}

module.exports = {
    createGame
}