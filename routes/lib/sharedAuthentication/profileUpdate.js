const jwt = require('jsonwebtoken');

const {isAlpha, isAlphanumeric, isStrongPassword} = require('validator')

function profileUpdate(req, res, next){    
    const { firstName, lastName, username, password, confirmPassword } = req.body
    let errObj = {}
    if(firstName){
        if(!isAlpha(firstName)){
            errObj.firstName = 'First name cannot have special characters or numbers'
        }
    }
    
    if(lastName){
        if(!isAlpha(lastName)){
            errObj.lastName = 'Last name cannot have special characters or numbers'
        }
    }
    
    if(username){
        if(!isAlphanumeric(username)){
            errObj.username = 'Username cannot have any special characters'
        }
    }
    
    if(password){
        if(!isStrongPassword(password)){
        errObj.password = 'Weak password! Please try a different one'
        }else{
            if(password !== confirmPassword){
                errObj.password = 'Password does not match'
            }
        }
    }
    

    if (Object.keys(errObj).length > 0){
        return res.status(500).json({
            message: "error1",
            error: errObj
        })
    }else{
        next()
    }


}

module.exports = {profileUpdate}