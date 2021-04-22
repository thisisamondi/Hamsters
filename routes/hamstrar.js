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

	if (!docRef.exists) {
		res.status(400).send("Ooops. Something went wrong")
		return
	}
	res.status(200).send(docRef.id)


	//TODO - KOLLA ATT DET ÄR ETT KORREKT HAMSTEROBJEKT
})
//PUT
router.put('/:id', async (req, res) => {

	const object = req.body
	const id = req.params.id

	console.log('console log 1', object);
	console.log('console log 1.2', id);

	if (!object || !id) {
		console.log('console log 1.5')
		res.sendStatus(400)
		return
	}

	console.log('console log 2');

//Vi kan kontollera om det finns ett doc som matchar id i databasen. Den här koden godkänner id som inte matchar och lägger till ett nytt doc i databasen.

	const docRef = db.collection('Hamsters').doc(id)
	await docRef.set(object, {merge: true})
	res.sendStatus(200)
})

function isHamsterObject(maybeObject) {

	//Pratigt, men kanske mera lättläst. kan göras mer kompakt
	if (!maybeObject)
		return false
	else if (!maybeObject.name || !maybeObject.age)
		return false

	return true
};




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

	// GET data
	const data = docRef.data()

	// IF SUCCESS
	res.send(data)

})

//DELETE
router.delete('/:id', async (req, res) => {

	// Du behöver ID
	const id = req.params.id

	if (!id) {
		res.sendStatus(400)
		return
	}

	await db.collection('Hamsters').doc(id).delete()
	res.sendStatus(200)

})


module.exports = router


