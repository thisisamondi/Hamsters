const express = require('express')
const app = express()

const PORT = 1337

//Hämtar root filen(/) så att den kan visas i porten
//GET registrerar en Route
app.get('/', (req, res) => {
    console.log('GET /');
 res.send('Yes i am  here')

})

app.get('/frontend', (req,res) => {
    console.log('This is frontend');
    res.sendFile(dirname + '/frontend/index.html')
})
//dirname är till för att veta var man befinner sig och då visar
//variabeln var man befinner sig fram till


//Startar upp servern
app.listen(PORT, () => {
    console.log('Server is listening on ' +  PORT)
})