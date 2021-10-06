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

//make Animal model
const Animal = model("Animal", animalSchema)

/*********************************
Middleware
*********************************/

app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

/*********************************
Routes
*********************************/
//Server Landing Page
app.get("/", (req,res) => {
    res.send("your server is running")
})

//Seed Route
app.get("/animals/seed", (req,res) => {
    const noahsArc = [
        { species: "Asian Elephant", extinct: false, location: "Indian subcontinent and Southeast Asia.", lifeExpectancy: 60 },
        { species: "Great White Shark", extinct: false, location: "in the deep end of the pool", lifeExpectancy: 70 },
        { species: "Bald Eagle", extinct: false, location: "North America", lifeExpectancy: 28 }
    ];

    Animal.remove({}, (err,data) => {
        Animal.create(noahsArc, (err,data) => {
            res.json(data);
        })
    })
})

//Index Route
app.get("/animals", (req,res) => {
    Animal.find({}, (err, allAnimals) => {
        res.render("animals/index", { allAnimals })
    })
})

//New Route
app.get("animals/new", (req,res) => {
    res.render("animals/new");
})

//Delete Route
app.delete("animals/:id", (req,res) => {
    Animal.findByIdAndRemove(req.body.id, (err, animal) => {
        res.redirect("/animals");
    })
})

//Update Route
app.put("/animals/:id", (req,res) => {
    Animal.findByIdAndUpdate(req.body.id, { new:true }, (err, animal) => {
        res.redirect("/animals");
    })
})

//Create Route
app.post("/animals", (req,res) => {
    Animal.create(req.body, (err,animal) => {
        res.redirect("/animals");
    })
})

//Edit Route
app.get("/animals/:id/edit", (req,res) => {
    Animal.findById(req.params.id, (err, animal) => {
        res.render("animal/edit", { animal })
    })
})

//Show Route
app.get("animals/:id", (req,res) => {
    Animal.findById(req.param.id, (err,data) => {
        res.render("animals/show")
    })
})

/*********************************
Server Listener
*********************************/
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening on port ${PORT}`));