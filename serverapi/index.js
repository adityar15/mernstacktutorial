const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000
require('dotenv').config()
const {userrouter} = require('./routes/user')
const {messagerouter} = require('./routes/message')

const {authorise} = require('./authorise')

app.use(express.json())
app.use(cors({
    credentials: true,
    origin:true
}))
app.use('/user', userrouter)
app.use('/message', authorise,messagerouter)

app.get('/', (req, res)=>{
    res.send("Hello World")
})





app.listen(port, ()=>{
    console.log('Your app is running on http://localhost:'+port)
})