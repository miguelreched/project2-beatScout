const express = require("express");
const User = require("../models/User.model")
const router = express.Router()

const isUserLogged = require("../middlewares/user.middleware.js")
const isAdmin = require("../middlewares/user.middleware.js")


// /GET "/home" => renderizar la vista  de la home


// router.get("/followed",(req, res, next)=>{

//     res.render("user/followed.hbs")
// })
router.get("/home",isUserLogged, (req,res,next)=>{
    
    res.render("user/home.hbs")


})






module.exports = router;