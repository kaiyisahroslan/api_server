let mongoose = require('mongoose')

// Create schema(used to map information)
let mongoSchema = mongoose.Schema

let amountSchema = new mongoSchema({
    "name": String,
    "bells": Number,
    "whistles": Number
}, {collection:'amount'})

// Export the mongoose model
module.exports = mongoose.model('amount', amountSchema)