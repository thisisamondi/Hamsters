const express = require('express')
const app = express()
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js')


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
//GET registrerar en Route
app.get('/', (req, res) => {
    console.log('GET /');
 res.send('Hamsters project')
})

app.get('/simulate-error', (req, res) =>{
    let x;
    
    try {   
    x.name = "Hanna"
    res.send(x.name)
    } catch (error) {
        console.log("ett fel inträffade" + error.message)
        res.status(500).send(error.message);
    }
   
})


//Startar upp servern
app.listen(PORT, () => {
    console.log('Server is listening on ' +  PORT)
})

//REST API för hamstrar
app.use('/hamsters', hamsters)
app.use('/matches', matches)