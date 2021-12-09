const express = require("express");

const router = express.Router();

const {checkIsEmpty, checkIsUndefined, validateCreateData, validateLoginData, jwtMiddleware, profileUpdate} = require('../lib/index')
const { createUser, login } = require('./controller/userController')

router.post("/create-user",checkIsUndefined, checkIsEmpty, validateCreateData, createUser);
router.post('/login', checkIsUndefined, checkIsEmpty, validateLoginData, login)

module.exports = router;