const express = require('express');
const app = express();
const urlRouter = require('./routes/url')
const { connectToMongoDb } = require('./connect')

app.use(express.json())

app.use('/url',urlRouter)

connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=>{console.log("mongodb connected")})

app.listen(5001,()=>{
    console.log("server running in port",5001)
})