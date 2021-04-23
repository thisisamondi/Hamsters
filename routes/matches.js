//importera databas från database.js
const getDatabase = require('../database.js')
//anropa funktionen
const db = getDatabase();

const express = require('express');
const router = express.Router()

//GET /matches
router.get('/', async (req, res) => {
	// console.log('/hamstrar REST API');
	// res.send('/hamstrar REST API');

	const matchesRef = db.collection('Matches');
	const snapshot = await matchesRef.get();

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

//GET /matches/:id
router.get('/:id', async (req, res) => {

	const id = req.params.id
	const docRef = await db.collection('Matches').doc(id).get()

	if (!docRef.exists) {
		res.status(404).send("Match does not exist")
		return
	}

	// GET data
	const data = docRef.data()

	// IF SUCCESS
	res.send(data)

})

//POST /matches
router.post('/', async (req, res) => {
	const match = req.body

	// utan att ange id
	const docRef = await db.collection('Matches').add(match)
	console.log('The document id is: ' + docRef.id)

	if (!docRef.exists) {
		res.status(400).send("Ooops. Something went wrong")
		return
	}
	res.status(200).send(docRef.id)


	//TODO - KOLLA ATT DET ÄR ETT KORREKT MATCHOBJEKT
})

// GET /matches
// router.get('/:games', async (req, res) => {
// 	const games = req.params.games
// 	console.log('hamster games', games);

// 	const docRef = await db.collection('Hamsters').doc(games).get()

// 	if (!docRef.exists) {
// 		res.status(404).send("Hamster does not exist")
// 		return
// 	}

// 	GET data
// 	const data = docRef.data()

// 	IF SUCCESS
// 	res.send(data)

// })





//DELETE /matches/:id

//GET matchwinner/:id





module.exports = router