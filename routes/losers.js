const getDatabase = require('../database.js')
const db = getDatabase();

const express = require('express');
const router = express.Router()

//GET /matches
router.get('/', async (req, res) => {

	const losersRef = db.collection('Hamsters');
	const snapshot = await losersRef.orderBy('defeats', 'desc').limit(5).get();
	console.log('console log 1', snapshot)
	
	if (snapshot.empty) {
		res.status(404).send("Hamsters not found.")
		return
	}

	let items = []

	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		items.push(data)
	})
	res.status(200).send(items)
});


module.exports = router