/*********************************
Dependencies
*********************************/

const express = require("express");
const Animal = require("../models/animal")

//Create Router
const router = express.Router()

//Routes
//Seed Route
router.get("/seed", (req,res) => {
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
router.get("/", (req,res) => {
    Animal.find({}, (err, allAnimals) => {
        res.render("animals/index", { allAnimals })
    })
})

//New Route
router.get("/new", (req,res) => {
    res.render("animals/new");
})

//Delete Route
router.delete("/:id", (req,res) => {
    Animal.findByIdAndRemove(req.body.id, (err, animal) => {
        res.redirect("/animals");
    })
})

//Update Route
router.put("/:id", (req,res) => {
    Animal.findByIdAndUpdate(req.body.id, { new:true }, (err, animal) => {
        res.redirect("/animals");
    })
})

//Create Route
router.post("/", (req,res) => {
    console.log(req.body);
    Animal.create(req.body, (err, animal) => {
        res.redirect("/animals");
    })
})

//Edit Route
router.get("/:id/edit", (req,res) => {
    Animal.findById(req.params.id, (err, animal) => {
        res.render("animal/edit", { animal })
    })
})

//Show Route
router.get("/:id", (req,res) => {
    Animal.findById(req.param.id, (err,data) => {
        res.render("animals/show")
    })
})


//Export Router
module.exports = router;
