const express = require('express')
const cors = require('cors')
var passport = require('passport');
const app = express()
require("dotenv").config()
const port = 3000



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

require("./config/database")
require("./config/passport")



const taskManagement = require('./route/task.route')
const userRoute = require('./route/user.route')

app.use("/taskManagement", taskManagement)
app.use("/", userRoute)


// Home  Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the server</h1>')
})


// Profile  Route
app.get('/profile', passport.authenticate('jwt', { session: false }),
    function (req, res) {
        return res.status(200).send({
            success: true,
            user: {
                id: req.user._id,
                username: req.user.username
            }
        });
    }
);



// Resource not  found
app.use('/', (req, res, next) => {
    res.status(404).json({
        message: "Route not found"
    })
})

// Server not  found
app.use((err, req, res, next) => {
    // console.error(err.stack)
    // res.status(500).send("Something went wrong !")
    // next(); 

    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message, // Send the error message in the response
        error: err, // Include the error object for debugging purposes
    });
})


module.exports = app;