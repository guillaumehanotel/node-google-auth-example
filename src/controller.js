const router = require('express').Router()
const path = require('path')
const helper = require('./helper')

router.get('/', function (req, res) {
    res.send('Hello World')
})

router.get('/login', function (req, res) {
    res.sendFile(path.dirname(__dirname) + '/public/index.html')
})

router.get('/me', async function (req, res) {
    const user = await helper.retrieveUserFromRequest(req)
    if (user) {
        res.send(user)
    } else {
        res.sendStatus(404)
    }
})

router.post('/users', async function (req, res) {
    const userData = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.fullname,
        req.body.imageUrl,
        req.body.googleUid,
    ]
    await helper.createUser(userData)
    const user = await helper.getUserByGoogleId(req.body.googleUid)
    if (user) {
        res.send(user)
    } else {
        res.sendStatus(500)
    }
})

module.exports = router
