const getDatabase = require('../database.js')
const db = getDatabase();

const express = require('express');
const router = express.Router()

//GET /matches
router.get('/', async (req, res) => {

	const matchesRef = db.collection('Matches');
	const snapshot = await matchesRef.get();

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
	res.status(200).send(data)

})

//POST /matches
router.post('/', async (req, res) => {
	
	const matches = req.body

	if (!isMatchesObject(matches)) {
		res.status(400).send("Bad request. Matches is undefined")
		return
	}

	const docRef = await db.collection('Matches').add(matches)
	console.log('The document id is: ' + docRef.id)


	res.status(200).send({id:docRef.id})

})


//Check if matches is a correct object
function isMatchesObject(maybeObject) {

	if (!maybeObject)
		return false
	else if (!maybeObject.winnerId || !maybeObject.loserId)
		return false

	return true
};


//DELETE /matches/:id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const docRef = db.collection('Matches').doc(id)

    const doc = await docRef.get();

  try{
        if (!doc.exists) {
        res.status(404).send("Database does not exist")
        return
      }

      	if (!id) {
        res.status(400).send('ID not found')
        return
      }

      await docRef.delete()
      res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500).send(err.message)
    }
})



module.exports = router