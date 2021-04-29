const getDatabase = require('../database.js')
const db = getDatabase();
const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    console.log('GET /');
 res.send('MATCH WINNERS')
})
// GET matchwinner/:id
router.get('/:id', async (req, res) => {

	const id = req.params.id
	const docRef = db.collection('Matches')

	const snapshot = await docRef.where('winnerId', '==', `${id}`).get();
	
	if (snapshot.empty) {
			res.status(404).send("Hamsters not found.")
			return
		}
		
		items = []

		snapshot.forEach(doc => {
			const data = doc.data()
			items.push(data)
		})

	// IF SUCCESS
	res.status(200).send(items)
	
})


module.exports = router