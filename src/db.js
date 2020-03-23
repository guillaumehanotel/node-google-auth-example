const db = require('sqlite');


db.open('google-auth-example.db').then(() => {
    createTableUsers();
});

function createTableUsers(){
    db.run("CREATE TABLE IF NOT EXISTS users (google_uid, pseudo, email, firstname, lastname, image_url)")
        .then(() => {
            console.log(('> Table users created'))
        }).catch((err) => {
        console.error('ERR> ', err)
    })
}

module.exports = db;
