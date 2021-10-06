/*********************************
Dependencies
*********************************/

require("dotenv").config();
const mongoose = require("mongoose");

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

//Export the Mongoose Connection
module.exports = mongoose;