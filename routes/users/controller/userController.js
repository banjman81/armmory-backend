const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require("../model/User");
const validator = require("validator");
const Comment = require('../../comments/model/Comment')
const Game = require('../../games/model/Game')

// const ErrorHandler = require('../../utils/error/errorHandler');
const errorHandler = require("../../utils/errorHandler");

async function createUser(req, res) {
    try {
        let salt = await bcrypt.genSalt(12);

        let {firstName, lastName, username, email, password} = req.body

        let hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password : hashedPassword
        });

        let savedUser = await createdUser.save();

        res.json({
        message: "success! user created please login",
        savedUser: savedUser,
        });
    } catch (err) {
        // res.status(500).json({ message: "error", err });
        return res.status(500).json({
            message : "error1",
            error : errorHandler(err)
        });
    }
}

async function login(req, res){
    const {email, password} =req.body
    try{
        let foundUser = await User.findOne({email: email})
        if(!foundUser){
            res.status(500).json({
                message: 'error',
                error: "User not found, Please sign up!"
            })
        }else{
            let comparedPassword = await bcrypt.compare(password, foundUser.password)

            if(!comparedPassword){
                res.status(500).json({
                    message : 'error',
                    error: "Incorrect login information. Please try again"
                })
            }else{
                let jwtToken = jwt.sign (
                    {
                        email: foundUser.email,
                        username: foundUser.username
                    },
                    process.env.JWT_USER_SECRET,
                    {expiresIn : "24h"}
                )

                res.json({
                    message : 'successfully logged in',
                    token : jwtToken
                })
            }
        }
    }catch(err){
        res.status(500).json({
            message: "error",
            error: errorHandler(err)
        })
    }
}

async function getUserByEmail(req, res){
    try{
        let foundUser = await User.findOne({email: req.params.email})
        if(!foundUser){
            res.status(500).json({
                message: 'error',
                error: "User not found, Please sign up!"
            })
        }else{
            res.json({
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                username: foundUser.username,
                email: foundUser.email,
                role: foundUser.role
            })
        }

    }catch(err){
        res.status(500).json({
            message: "error",
            error: errorHandler(err)
        })
    }
}

async function profileUpdate(req, res){
    try{
        let salt = await bcrypt.genSalt(12);

        let {password} = req.body

        let hashedPassword = await bcrypt.hash(password, salt);

        req.body.password = hashedPassword
        const decodedData = res.locals.decodedData

        let foundUser = await User.findOne({email : decodedData.email})

        let updatedUser = await User.findByIdAndUpdate(foundUser._id, req.body, {new: true})
        console.log(req.body.password)
        res.json({
            message : "success",
            payload: updatedUser
        })
    }catch(err){
        res.status(500).json({
            message: "error",
            error: errorHandler(err)
        })
    }
}

async function deleteUser(req, res){
    try{
        const decodedData = res.locals.decodedData

        let foundUser = await User.findOne({email : decodedData.email})

        let foundGames = await Game.find()
        let filteredGames = foundGames.filter(game => game.users.toString() === foundUser._id.toString())

        filteredGames.map(game =>{
            deleteGame(game._id)
        })

        let foundComments = await Comment.find()
        let filteredComments = foundComments.filter(comment => comment.user.toString() === foundUser._id.toString())

        let deletedUser = await User.findByIdAndDelete(foundUser._id)

        filteredComments.map(comment => {
            deleteComment(comment._id)
        })

        res.json({
            message: "success",
            payload: foundUser
        })

    }catch(err){
        res.status(500).json({
            message: "error",
            error: errorHandler(err)
        })
    }
}

async function deleteGame(id){
    try{
        return await Game.findByIdAndDelete(id)

    }catch(err){
        res.status(500).json({
            message: "error",
            error: errorHandler(err)
        })
    }
}

async function deleteComment(id){
    try{
        return await Comment.findByIdAndDelete(id)

    }catch(err){
        res.status(500).json({
            message: "error",
            error: errorHandler(err)
        })
    }
}

module.exports = {
    createUser,
    login,
    getUserByEmail,
    profileUpdate,
    deleteUser
};