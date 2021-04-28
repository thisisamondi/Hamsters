const getDatabase = require('../database.js')
const db = getDatabase();
const express = require('express');
const router = express.Router()


// GET /winners
router.get('/', async (req, res) => {

	const winnersRef = db.collection('Hamsters');
	const snapshot = await winnersRef.orderBy('wins', 'desc').limit(5).get();
	
	if (snapshot.empty) {
		res.sendStatus(404)
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