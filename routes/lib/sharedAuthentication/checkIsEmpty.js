const {isEmpty} = require('validator')

function checkIsEmpty(req, res, next){
    let body = req.body
    console.log("reached check isempty")

    let errObj = {}

    for(let key in body){
        if(isEmpty(body[key])){
            errObj[`${key}`] = `${key} cannot be empty`
        }
    }

    if(Object.keys(errObj).length > 0){
        return res.status(500).json({
            message:  'error',
            error: errObj
        })
    }
    else{
        next()
    }
}

module.exports = {
    checkIsEmpty,
}