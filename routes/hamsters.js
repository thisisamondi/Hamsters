//importera databas från database.js
const getDatabase = require('../database.js')
//anropa funktionen
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
		data.id = doc.id //ID behövs för POST, PUT, DELETE
		// res.send(data)
		items.push(data)
	})
	res.status(200).send(items)
});


//POST
router.post('/', async (req, res) => {
	
	const hamster = req.body

	if (!isHamsterObject(hamster)) {
		res.status(400).send("Bad request. Req.body is undefined")
		console.log("console log 1")
		return
	}

	const docRef = await db.collection('Hamsters').add(hamster)
	console.log('The document id is: ' + docRef.id)


	console.log("console log 2")
	res.status(200).send({id:docRef.id})


})

//PUT


//Pseudocode



//returnera svar om ID finns
//returnera svar om ID inte finns
//Om ID finns skicka statuskod + put

//PUT
// router.put('/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//         const docRef = await db.collection('Hamsters').doc(id).get()
//         if ( !id || !docRef.exists ) {
//             res.status(404).send("The id provided did not match any hamster in our db")
//             return
//         }
//         const object = req.body
//         if ( Object.entries(object).length === 0 ) {
//             res.status(400).send("Nothing in body")
//             return
//         }
//         await db.collection('Hamsters').doc(id).update(object)
//         const message  = "Successfully updated document " + id
//         res.status(200).send(message)
	
//     } catch (e) {
//         res.status(500).send("Error occuring while updating document")
//     }
// })

router.put('/:id', async (req, res) => {

	//req body från insomnia
	const object = req.body
	//gör en request med ID
	const id = req.params.id
	
	const docRef = await db.collection('Hamsters').doc(id).get()
	
	//Kolla om ID finns i databasen
	if (!id || !docRef.exists ) {
		console.log("console log 1", id )
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
	const docRef = db.collection('Hamsters').doc(id)

	const doc = await docRef.get();

	if (!doc.exists) {
		res.status(404).send("Hamsters does not exist")
		return
	}

	if (!id) {
		res.sendStatus(400)
		return
	}
	
	await docRef.delete()	
	res.sendStatus(200)

})


module.exports = router

