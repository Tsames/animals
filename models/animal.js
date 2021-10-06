/*********************************
Dependencies
*********************************/

const mongoose = require("./connection");

/*********************************
Animals Model
*********************************/
const {Schema, model} = mongoose

const animalSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

//make Animal model
const Animal = model("Animal", animalSchema)

//Export Model
module.exports = Animal