const express = require('express')
const router = express.Router()
const passport = require("passport")

router.post('/', passport.authenticate("listingUser", {session : false}), function(req, res){
    res.send('games', req.user)
})
router.post('/add-game', passport.authenticate("listingUser", {session : false}), function(req, res, next){
    res.send(req.user)
})

module.exports = router