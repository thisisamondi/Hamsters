const admin = require("firebase-admin");

//firebase private key
const serviceAccount = require("./firebase_key.json");

//Initialisera appen när vi startar webbserver
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//Hämta databasen
function getDatabase() {
	return admin.firestore();
}

//exportera databasen
module.exports = getDatabase