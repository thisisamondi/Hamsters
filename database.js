const admin = require("firebase-admin");



let serviceAccount;
// HEROKU
// heroku.com, configvars -> key = PRIVATE_KEY, VALUE -> All den hemliga infon från private key
if (process.env.PRIVATE_KEY){
    serviceAccount = JSON.parse(process.env.PRIVATE_KEY)
} else {
    serviceAccount = require("./firebase_key.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//Hämta Databasen
function getDatabase() {
    return admin.firestore()
}


// let privateKey;
// try {
//     privateKey = require('./firebase_key.json')
// } catch {
//     privateKey = JSON.parse(process.env.PRIVATE_KEY)
// }

//exportera databasen
module.exports = getDatabase