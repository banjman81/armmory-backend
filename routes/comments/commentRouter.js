const express = require("express");
const router = express.Router();
const passport = require('passport')

const {createComment, findComment} =  require('./controllers/commentController')

router.post('/add-comment', passport.authenticate("listingUser", {session : false}), createComment)
router.get('/find-comment/:gameId', findComment)

module.exports = router