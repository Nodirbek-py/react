const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const PORT = config.get('port')
const app = express()


app.use('/api/auth/', require('./routes/auth_routes'))
app.use(express.json({extended: true}))
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, ()=>console.log("website is wokring"))
    }
    catch (e) {
        console.log("Error", e.message)
        process.exit(1)

    }
}
start()
