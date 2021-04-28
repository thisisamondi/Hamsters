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
	// console.log('console log 1', id)
	const docRef = db.collection('Matches')

	const snapshot = await docRef.where('winnerId', '==', `${id}`).get();
	
	// const allMatches = await docRef.where('id', '==', {$id}).get();
	if (snapshot.empty) {
			res.sendStatus(404)
			// res.send([])
			return
		}
		
		items = []

		snapshot.forEach(doc => {
			const data = doc.data()
			// data.id = doc.id 
			items.push(data)
		})
	// IF SUCCESS
	res.status(200).send(items)
	
})


module.exports = router