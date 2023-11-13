const express = require("express");
const router = express.Router();


const isUserLogged = require("../middlewares/user.middleware.js")

// ruta privada ar ausuarios con sesiones activas

router.get("/home",isUserLogged, (req,res,next)=>{
    
    res.render("user/home.hbs")


})


// const isUserRegistered = require("../middlewares/user.middleware.js")

// router.get("/home",isUserRegistered, (req,res,next)=>{
    
//     res.render("user/home.hbs")


// })


















module.exports = router;