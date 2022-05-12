const express = require('express')
const router = express.Router()
const passport = require("passport")
const axios = require('axios')
const cheerio = require('cheerio')
const uuid = require('uuid')

const { createGame, removeGame, getFavorites } = require('./controller/gamesController')

router.post('/add-game', passport.authenticate("listingUser", {session : false}), createGame)
router.delete('/delete-game/:gameId', passport.authenticate("listingUser", {session : false}), removeGame)
router.get('/favorites', passport.authenticate("listingUser", {session : false}), getFavorites)
router.get('/get-mmo-news',  async (req, res) => {
    axios('https://www.mmorpg.com/articles?')
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
            $('.item', html).each(function(){
                const image = $(this).find('img').attr('src')
                const title = $(this).find('h3').text()
                const url = $(this).find('h3').find('a').attr('href')
                const urlTitle = $(this).find('.col-auto').find('a').text()
                const time = $(this).find('time').text()
                let author = $(this).find('.item__content__footer').find('a').text()
                author = author.slice(0, author.length - 1)
                articles.push({
                    id: uuid.v1(),
                    title,
                    image,
                    url,
                    urlTitle,
                    time,
                    author
                })
            })

            const filteredArticles = articles.filter(article => article.url.slice(0,5) === '/news')

            res.json({
                filteredArticles
            })
        })
    
})

module.exports = router