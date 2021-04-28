//importera databas från database.js
const getDatabase = require('../database.js')
//anropa funktionen
const db = getDatabase();

const express = require('express');
const router = express.Router()

//GET /matches
router.get('/', async (req, res) => {

	const losersRef = db.collection('Hamsters');
	const snapshot = await losersRef.orderBy('defeats', 'desc').limit(5).get();
	console.log('console log 1', snapshot)
	
	if (snapshot.empty) {
		res.sendStatus(404)
		return
	}

	let items = []

	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id //ID behövs för POST, PUT, DELETE
		// res.send(data)
		items.push(data)
	})
	res.status(200).send(items)
});





module.exports = router