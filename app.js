const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('Hello World! Sergii@Birkbeck is fun!')    
})

app.listen(3000)