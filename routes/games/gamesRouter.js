const express = require('express')
const router = express.Router()
const passport = require("passport")

const { createGame } = require('./controller/gamesController')

router.post('/add-game', passport.authenticate("listingUser", {session : false}), createGame)

module.exports = router