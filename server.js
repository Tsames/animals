/*********************************
Dependencies 
*********************************/

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const AnimalRouter = require("./controllers/animal")

//Express App Object
const app = express();

/*********************************
Middleware
*********************************/

app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use("/animals", AnimalRouter);

/*********************************
Server Listener
*********************************/
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening on port ${PORT}`));