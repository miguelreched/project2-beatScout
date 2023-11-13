const express = require("express");
const router = express.Router();


const isUserLogged = require("../middlewares/user.middleware.js")
const isAdmin = require("../middlewares/user.middleware.js")

// ruta privada ar ausuarios con sesiones activas

router.get("/home",isUserLogged, (req,res,next)=>{
    
    res.render("user/home.hbs")


})


router.get("/profile",isUserLogged, (req,res,next)=>{
    
    res.render("user/profile.hbs")
    User.findById(req.session.user._id)
    .then((response)=>{
        console.log(response)
        res.render("user/profile.hbs", {
        userProfile: response})
    })
    .catch((err)=> next(err))
    })




router.get("/")

// const isUserRegistered = require("../middlewares/user.middleware.js")

// router.get("/home",isUserRegistered, (req,res,next)=>{
    
//     res.render("user/home.hbs")


// })


















module.exports = router;