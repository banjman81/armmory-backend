const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require("../model/User");
const validator = require("validator");

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
            error: err.message
        })
    }
}

module.exports = {
    createUser,
    login
};