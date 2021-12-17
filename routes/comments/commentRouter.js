const express = require("express");
const router = express.Router();
const passport = require('passport')

const {createComment} =  require('./controllers/commentController')

router.post('/add-comment', passport.authenticate("listingUser", {session : false}), createComment)

module.exports = router