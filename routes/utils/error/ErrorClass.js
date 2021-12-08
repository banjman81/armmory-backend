function ErrorClass(error, statusCode = 500){

    let errObj = {};

    if (typeof error === "object"){
        if (error.code) {
            console.log("ttttttttttttttttttt")
            return handleMongoDuplicationError(error, statusCode)
        } else{
            return handleMongoServerValidationError(error, statusCode)
        }
    }

    if (typeof error === "string"){
        errObj.statusCode = statusCode,
        errObj.message = error

        return errObj
    }

}

function handleMongoServerValidationError(error){
    console.log(error)
    let mongoErrorObj = error.errors
    let errObj = {}

    for (var errName in mongoErrorObj){
        switch(mongoErrorObj[errName].properties.type){
            case "required":
                errObj.statusCode = 400;
                errObj.message = mongoErrorObj[errName].properties.message;
                errObj.errorInfo = `Missing information, ${mongoErrorObj[errName].properties.message}`;
                break;

            case "minlength":
                errObj.statusCode = 400;
                errObj.message = mongoErrorObj[errName].properties.message;
                errObj.errorInfo = "Password must be minimum of 8 characters";
                break;

            case "regexp":
                errObj.statusCode = 500;
                errObj.message = mongoErrorObj[errName].properties.message;
                errObj.errorInfo = `${mongoErrorObj[errName].properties.path} ${mongoErrorObj[errName].properties.message}`;
                break;

            default:
                errObj.statusCode = 400;
                errObj.message = mongoErrorObj[errName].properties.message;
                errObj.errorInfo = "Missing information";
                break;
        }
    }

    return errObj
}

function handleMongoDuplicationError(error){
    let errObj = {}

    switch(error.code){
        case 11000:
        case 11001:
            errObj.statusCode = 409
            errObj.message = {...error.KeyValue, errorInfo: "duplicate"}
            break
        default:
            errObj.statusCode = 409
            errObj.message = {...error.KeyValue, errorInfo: "duplicate"}
            break

    }

    return errObj
}

module.exports = ErrorClass