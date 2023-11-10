const express = require("express");
const Band = require("../models/Band.model")
const router = express.Router()
const bcrypt = require("bcryptjs")



// GET /"add-bands" nos lleva a añadir  bandas a nuestra lista


router.get ("/add-bands", (req, res, next)=> {

    res.render("band/add-bands.hbs")


})




// GET "/favorite band" nos lleva a ver a nuestras bandas faoritas


router.get("/favorite-bands", (req, res , next) =>{

res.render("band/favorite-bands.hbs")

})




















module.exports = router;