var mongoose = require('mongoose')

var citySchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: String,
    departureTime: String,
    price: Number,
    id : String,
})

var cityModel = mongoose.model('histos', citySchema)

module.exports = cityModel;