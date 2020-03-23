const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = require('../google-services').web.client_id
const client = new OAuth2Client(CLIENT_ID)
const db = require('./db');


module.exports = {

    getTokenIdFromRequest: function (req) {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) {
            return authorizationHeader.split(' ')[1]
        }
    },

    // TODO risque de lever une exception si token non valide ?
    isAuthenticated: async function (req) {
        const tokenId = this.getTokenIdFromRequest(req)
        if (tokenId) {
            await client.verifyIdToken({
                idToken: tokenId,
                audience: CLIENT_ID
            })
            return true
        } else {
            return false
        }
    },

    retrieveUserFromRequest: async function (req) {
        const tokenId = this.getTokenIdFromRequest(req)
        if (tokenId) {
            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: CLIENT_ID
            })
            const userGoogleId = ticket.getUserId()
            const user = this.getUserByGoogleId(userGoogleId)
            return user
        }
    },

    getUserByGoogleId: async function(googleId) {
        const query_select_user = "SELECT rowid, * FROM users WHERE google_uid = ?";
        return await db.get(query_select_user, googleId)
    },


    createUser: async function(user_data) {
        const query_insert_user = "INSERT INTO users (firstname, lastname, email, pseudo, image_url, google_uid) VALUES (?, ?, ?, ?, ?, ?)";
        await db.run(query_insert_user, user_data)
    },

    isRequestBelongToWhiteList: function (url, method) {
        const whiteListRequests = [
            {
                url: '/users',
                method: 'POST'
            },
            {
                url: '/login',
                method: 'GET'
            }
        ];

        for (let whiteListRequest of whiteListRequests) {
            if(whiteListRequest.url === url && whiteListRequest.method === method){
                return true
            }
        }
        return false;
    }

}

