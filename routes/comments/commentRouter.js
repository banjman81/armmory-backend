const express = require("express");
const router = express.Router();
const {jwtMiddleware} = require('../lib/sharedAuthentication/jwtMiddleware')

const {createComment, findComment, deleteComment} =  require('./controllers/commentController')

router.post('/add-comment', jwtMiddleware, createComment)
router.get('/find-comment/:gameId', findComment)
router.delete('/delete-comment/:id', jwtMiddleware, deleteComment)

module.exports = router