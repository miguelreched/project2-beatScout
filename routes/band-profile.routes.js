const express = require("express");
const router = express.Router();
const Band = require("../models/Band.model");


const {isUserLogged, isAdmin} = require("../middlewares/user.middleware.js")

router.get("/profile",isUserLogged, (req,res,next)=>{
    

    Band.findById(req.session.band._id)
    .then((response)=>{
        console.log(response)
        res.render("band/favorite-band.hbs", {
        bandProfile: response})
    })
    .catch((err)=> next(err))
    })




router.get("/")








module.exports = router;