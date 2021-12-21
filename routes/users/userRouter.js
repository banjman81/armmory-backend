const express = require("express");

const router = express.Router();

const {checkIsEmpty, checkIsUndefined, validateCreateData, validateLoginData, jwtMiddleware} = require('../lib/index')
const { createUser, login, getUserByEmail, profileUpdate, deleteUser } = require('./controller/userController')

router.post("/create-user",checkIsUndefined, checkIsEmpty, validateCreateData, createUser);
router.post('/login', checkIsUndefined, checkIsEmpty, validateLoginData, login)
router.get('/getUserByEmail/:email', getUserByEmail)
router.put('/changepass', jwtMiddleware, profileUpdate)
router.delete('/delete-user', jwtMiddleware, deleteUser)

module.exports = router;