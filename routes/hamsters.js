const getDatabase = require('../database.js')
const db = getDatabase();
const express = require('express');
const router = express.Router()


//GET
router.get('/', async (req, res) => {

	const hamstrarRef = db.collection('Hamsters');
	const snapshot = await hamstrarRef.get();

	if (snapshot.empty) {
		res.send([])
		return
	}
	items = []

	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		items.push(data)
	})
	res.status(200).send(items)
});


//POST
router.post('/', async (req, res) => {
	
	const hamster = req.body

	if (!isHamsterObject(hamster)) {
		res.status(400).send("Bad request. Req.body is undefined")
		return
	}

	const docRef = await db.collection('Hamsters').add(hamster)
	console.log('The document id is: ' + docRef.id)

	res.status(200).send({id:docRef.id})


})

//PUT
router.put('/:id', async (req, res) => {
	
	const object = req.body
	const id = req.params.id
	const docRef = await db.collection('Hamsters').doc(id).get()
	
	//Kolla om ID finns i databasen
	if (!id || !docRef.exists ) {
		res.status(404).send("ID not found")
		return
	}
	//Kolla om objekt inte är ett tomt objekt
	else if (Object.keys(object).length === 0) {
		res.status(400).send("Bad request. Cannot send empty body")
		return
	}

	await db.collection('Hamsters').doc(id).set(object, {merge: true})

	res.sendStatus(200)
})


//Check if hamster is a correct object
function isHamsterObject(maybeObject) {

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
		data.id = doc.id 
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

	const id = req.params.id
	const docRef = db.collection('Hamsters').doc(id)

	const doc = await docRef.get();

	if (!doc.exists) {
		res.status(404).send("Hamsters does not exist.")
		return
	}

	if (!id) {
		res.status(400).send ("ID doesn not exist.")
		return
	}
	
	await docRef.delete()	
	res.sendStatus(200)

})


module.exports = router

