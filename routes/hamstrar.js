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
		res.send([])
		return
	}
	items = []

	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id //ID behövs för POST, PUT, DELETE
		// res.send(data)
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



//RANDOM HAMSTER
router.get('/random', async (req, res) => {

	const hamstrarRef = db.collection('Hamsters');
	const snapshot = await hamstrarRef.get();
	if (snapshot.empty) {
		res.send([])
		return
	}
	items = []

	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id //ID behövs för POST, PUT, DELETE
		// res.send(data)
		items.push(data)
	})

	const randomIndex = Math.floor(Math.random() * items.length)
	res.status(200).send(items[randomIndex])

})


//HAMSTER ID
router.get('/:id', async (req, res) => {

	const id = req.params.id
	const docRef = await db.collection('Hamsters').doc(id).get()

	if (!docRef.exists) {
		res.status(404).send("Hamster does not exist")
		return
	}

	const data = docRef.data()
	// IF SUCCESS
	res.send(data)

})


module.exports = router


