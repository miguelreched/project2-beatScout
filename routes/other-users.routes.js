const express = require("express");
const User = require("../models/User.model")
const router = express.Router()

const {isUserLogged, isAdmin} = require("../middlewares/user.middleware.js")



//GET "/followed" => renderizar la vista  de todos los usuarios que seguimos


// router.get("/followed",(req, res, next)=>{

//     res.render("user/followed.hbs")
// })
router.get("/followed",isUserLogged, (req,res,next)=>{
    
    res.render("user/followed.hbs")


})












module.exports = router;