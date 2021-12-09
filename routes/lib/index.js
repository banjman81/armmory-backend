const {checkIsEmpty} = require('./sharedAuthentication/checkIsEmpty')
const {checkIsUndefined} = require('./sharedAuthentication/checkIsUndefined')
const {jwtMiddleware} = require('./sharedAuthentication/jwtMiddleware')
const {profileUpdate} = require('./sharedAuthentication/profileUpdate')
const {validateCreateData} = require('./createValidation/validateCreateData')
const {validateLoginData} = require('./loginValidation/validateLoginData')

module.exports = {
    checkIsEmpty,
    checkIsUndefined,
    jwtMiddleware,
    profileUpdate,
    validateCreateData,
    validateLoginData
}