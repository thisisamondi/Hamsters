const express = require('express')
const app = express()
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js')
const matchWinners = require('./routes/matchWinners.js')
const winners = require('./routes/winners.js')
const losers = require('./routes/losers.js')


const PORT = process.env.PORT || 1338
const staticFolder = path.join(__dirname, 'static')


//Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.params);
    next()
})

app.use(express.json())
app.use(cors());
app.use(express.static(staticFolder))


//Hämtar root filen(/) så att den kan visas i porten
app.get('/', (req, res) => {
    console.log('GET /');
 res.send('Hamsters project')
})


//Startar upp servern
app.listen(PORT, () => {
    console.log('Server is listening on ' +  PORT)
})

//REST API
app.use('/hamsters', hamsters)
app.use('/matches', matches)
app.use('/matchWinners', matchWinners)
app.use('/losers', losers)
app.use('/winners', winners)