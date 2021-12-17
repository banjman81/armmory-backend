const express = require('express')
const router = express.Router()
const passport = require("passport")

const { createGame, removeGame, getFavorites } = require('./controller/gamesController')

router.post('/add-game', passport.authenticate("listingUser", {session : false}), createGame)
router.delete('/delete-game/:gameId', passport.authenticate("listingUser", {session : false}), removeGame)
router.get('/favorites', passport.authenticate("listingUser", {session : false}), getFavorites)

module.exports = router