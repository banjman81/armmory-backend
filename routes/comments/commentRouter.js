const express = require("express");
const router = express.Router();
const {jwtMiddleware} = require('../lib/sharedAuthentication/jwtMiddleware')

const {createComment, findComment} =  require('./controllers/commentController')

router.post('/add-comment', jwtMiddleware, createComment)
router.get('/find-comment/:gameId', findComment)

module.exports = router