const Game = require('../../games/model/Game')
const Comment = require('../../comments/model/Comment')
const User = require('../../users/model/User')

async function createComment(req, res){
    let {comment, id} = req.body

    const decodedData = res.locals.decodedData
    const foundUser = await User.findOne({email: decodedData.email})
    
    try{
        if(comment.length > 0){
            if(comment.length > 10){
                const createdComment = new Comment({
                    content: comment,
                    user : foundUser._id,
                    gameId : id
                })

                let savedComment = await createdComment.save()

                foundUser.comments.push(savedComment._id)

                await foundUser.save()
                res.json({
                    message: "success",
                    payload: 'createdComment',
                })
            }else{
                res.status(500).json({
                    message : "error",
                    error : "Comment is too short"
                })
            }
        }else{
            res.status(500).json({
                message : "error",
                error : "Comment cannot be empty"
            })
        }
        
    }catch(e){
        res.status(500).json({
            message : "error",
            error : e.message
        })
    }
    
    

}

async function findComment(req, res){
    let foundCommets = await Comment.find({gameId : req.params.gameId}).populate({path: "user", select: "username"})
    
    try{
        res.json({
            message: 'success',
            payload : foundCommets
        })

    }catch(err){
        res.status(500).json({
            message: "error1",
            error: err.message
        })
    }
}

async function deleteComment(req, res){
    try{
        const decodedData = res.locals.decodedData

        const foundUser = await User.findOne({email: decodedData.email})

        console.log(req.params.id)

        let foundComment = await Comment.findById(req.params.id)
        console.log(foundComment)
        
        if(foundComment === null){
            res.status(500).json({
                message: "error",
                error: 'comment id not found'
            })

        }else{

            const removedComment = await Comment.findByIdAndDelete(foundComment._id)
            const filteredComment = foundUser.comments.filter(item => item._id.toString() !== removedComment._id.toString())

            foundUser.comments = filteredComment

            await foundUser.save()
                res.json({
                message: "success",
                payload: removedComment
        })
        }

        

        
    }catch(e){
        res.status(500).json({
            message: "error",
            error: e.message
        })
    }
    

}

module.exports = {
    createComment,
    findComment,
    deleteComment
}