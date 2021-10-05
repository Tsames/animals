/*********************************
Dependencies 
*********************************/

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();

/*********************************
Database Connection
*********************************/
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//Create Mongoose Connection Object
mongoose.connect(DATABASE_URL, CONFIG);
//Connection Events
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected From Mongo"))
.on("error", (error) => console.log(error))

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

//make fruit model
const Animal = model("Animal", animalSchema)

/*********************************
Middleware
*********************************/

app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

/*********************************
Routes
*********************************/

app.get("/", (req,res) => {
    res.send("your server is running")
})

/*********************************
Server Listener
*********************************/
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening on port ${PORT}`));