
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt');
const User = require('./models/user.model');
var jwt = require('jsonwebtoken');
var passport = require('passport');
const saltRounds = 10;
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

app.use("/taskManagement", taskManagement)



// Home  Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the server</h1>')
})


// Register  Route
app.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (user) return res.status(400).send("User already exixt")

        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            const newUser = new User({
                username: req.body.username,
                password: hash,
            })

            await newUser.save().then((user) => {
                res.send({
                    success: true,
                    message: "User is created successfully",
                    user: {
                        id: user._id,
                        username: user.username
                    }
                })
            }).catch((error) => {
                console.log(error)
                res.send({
                    success: false,
                    message: "User is not created",
                    error: error
                })
            })
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Login  Route
app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
        return res.status(401).send({
            success: false,
            message: "User is not found"
        })
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send({
            success: false,
            message: "Incorrect Password"
        })
    }

    const payload = {
        id: user._id,
        username: user.username
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2d" })

    return res.status(200).send({
        success: true,
        message: "User is login successfully",
        token: "Bearer " + token
    })
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