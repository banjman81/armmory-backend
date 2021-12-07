function ErrorClass(error, statusCode = 500){}

function handleMongoServerValidationError(error){
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

            case "max":
                errObj.statusCode = 400;
                errObj.message = mongoErrorObj[errName].properties.message;
                errObj.errorInfo = "You exceeded the maximum number";
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