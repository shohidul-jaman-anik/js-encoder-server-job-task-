
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Home  Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the server</h1>')
})


// Resource not  found
app.use('/', (req, res, next) => {
    res.status(404).json({
        message: "Route not found"
    })
})

// Server not  found
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something went wrong !")
})



module.exports = app;