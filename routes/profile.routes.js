const express = require("express");
const router = express.Router();


const isUserLogged = require("../middlewares/user.middleware.js")

// ruta privada ar ausuarios con sesiones activas

router.get("/profile",isUserLogged, (req,res,next)=>{
    
    res.render("user/profile.hbs")


})

















module.exports = router;