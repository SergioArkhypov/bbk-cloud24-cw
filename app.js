const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const postsRoute = require('./routes/posts')
app.use('/api/post', postsRoute)

const authRoute = require('./routes/auth')
app.use('/api/user', authRoute)


app.get('/', (req,res)=> {
    res.send('You are in your home page! Piazza')
})

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('Sergii, your mongoDB connector is on...')
})

app.listen(3000, () => {
    console.log('Server is up and running, Sergii...')
})