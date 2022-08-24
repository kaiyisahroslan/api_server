let express = require('express')
let mongoose = require('mongoose')
let amount = require('./amount')
let cors = require('cors')

// Create express app
let app = express()

// Configure for cors
app.use(cors())
app.use(express.json())

// Connect to mongodb using mongoose
mongoose.connect("mongodb://localhost:27017/bellsandwhistles")
let db = mongoose.connection

// Check if connection was success
db.once("open", () => {
    console.log("Connected to mongodc database");
})

// Welcome api
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Bells & Whistles API!"
    })
})

// Get the list of all bells and whistles for all friends
app.get("/get/friends", (req, res) => {
    amount.find({}, (error, data) => {
        if(error) {
            res.json(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

// Add new friend to mongoDB
app.post("/add/friend", (req, res) => {
    // console.log(req)
    console.log(req.body)

    // Create new amount model instance
    let newFriend = new amount()
    newFriend.name = req.body.name
    newFriend.bells = req.body.bells
    newFriend.whistles = req.body.whistles

    // Save in mongoose
    newFriend.save((error, result) => {
        if(error) {
            res.json(error)
        } else {
            res.json(result)
        }
    })

    // res.json({
    //     message: "Add is successful"
    // })
})

// Make the app listen to port 4211
let PORT = 4211
app.listen(PORT, () => {
    console.log(`Listen to port ${PORT}`)
})