//importera databas från database.js
const getDatabase = require('../database.js')
//anropa funktionen
const db = getDatabase();

const express = require('express');
const router = express.Router()



//GET
router.get('/', async (req, res) => {
	// console.log('/hamstrar REST API');
	// res.send('/hamstrar REST API');

	const hamstrarRef = db.collection('Hamsters');
	const snapshot = await hamstrarRef.get();

	if (snapshot.empty) {
		res.sen([])
		return
	}
	items = []

	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id //ID behövs för POST, PUT, DELETE
		res.send(data)
		items.push(data)
	})
	res.status(200).send(items)
});


//POST
router.post('/', async (req, res) => {
	const hamster = req.body

	// utan att ange id
	const docRef = await db.collection('Hamsters').add(hamster)
	console.log('The document id is: ' + docRef.id)

	res.send(docRef.id)


})
//PUT

//DELETE
router.delete('/', async (req, res) => {

	// du måste ha "id"
	const docRef = db.collection('Hamsters').doc(id)
	const result = await docRef.delete()

})

module.exports = router