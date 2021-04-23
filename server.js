const express = require('express')
const app = express()
const cors = require('cors');
const path = require('path');
const hamstrar = require('./routes/hamstrar.js');
const matches = require('./routes/matches.js')
const staticFolder = path.join(__dirname, 'static')


const PORT = 1337

//Middleware
app.use((req, res, next) =>{
    console.log(`${req.method} ${req.url}`, req.params);
    next()
})

app.use (express.json())
app.use(cors());
app.use(express.static(staticFolder))


//Hämtar root filen(/) så att den kan visas i porten
//GET registrerar en Route
app.get('/', (req, res) => {
    console.log('GET /');
 res.send('Hamsters project')
})

//GET hamstrar
// app.get('/hamstrar', (req,res) => {
//     console.log('GET hamsters');
//     res.send('Hurraaa du hittade hamstrarna')
// })
//dirname är till för att veta var man befinner sig och då visar
//variabeln var man befinner sig fram till


//Startar upp servern
app.listen(PORT, () => {
    console.log('Server is listening on ' +  PORT)
})

//REST API för hamstrar
app.use('/hamstrar', hamstrar)
app.use('/matches', matches)