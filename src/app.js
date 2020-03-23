const express = require('express')
const bodyParser = require('body-parser')
const helper = require('./helper')

const app = express()
const PORT = process.PORT || 3000

// Middleware body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Middleware Authentification
app.use(async function (req, res, next) {

    if (helper.isRequestBelongToWhiteList(req.originalUrl, req.method)) {
        next()
    } else {
        const isAuthValid = await helper.isAuthenticated(req)
        if (isAuthValid) {
            next()
        } else {
            res.redirect('/login')
        }
    }
})

// Routes
app.use(require('./controller'))

// LOGGER
app.use((req, res, next)=>{
    next()
    console.log('REQUEST: ' + req.method + ' ' + req.url)
})

app.listen(PORT, ()=>{
    console.log('Serveur démarré :', 'http://lvh.me:' + PORT)
})
