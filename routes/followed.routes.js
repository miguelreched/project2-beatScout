const express = require("express");
const User = require("../models/User.model.js")
const router = express.Router()

const {isUserLogged, isAdmin} = require("../middlewares/user.middleware.js")





// router.get("/followed",(req, res, next)=>{
    
    //     res.render("user/followed.hbs")
    // })
    // router.get("/followed",isUserLogged, (req,res,next)=>{
        
    //     res.render("user/followed.hbs")

 //GET "/followed" => renderizar la vista  de todos los usuarios que seguimos

// router.get("/followed", isUserLogged, (req,res,next)=>{

//     User.find ()
//     .then((response)=>{

//         console.log(response)


        

//         res.render("user/followed.hbs", {

//             allUsers:response
//         })


//     })

//     .catch((error)=>{
        
//         console.log(error)


//     })


// })












module.exports = router;