const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

const uploader = require("../middlewares/cloudinary.middleware.js")

const {isUserLogged, isAdmin} = require("../middlewares/user.middleware.js")


// ruta privada ar ausuarios con sesiones activas

router.get("/home",isUserLogged, (req,res,next)=>{
    
    res.render("user/home.hbs")

})


router.get("/profile",isUserLogged, (req,res,next)=>{
    

    User.findById(req.session.user._id)
    .then((response)=>{
        console.log(response)
        res.render("user/profile.hbs", {
        userProfile: response})
    })
    .catch((err)=> next(err))
    })


// const isUserRegistered = require("../middlewares/user.middleware.js")

// router.get("/home",isUserRegistered, (req,res,next)=>{
    
//     res.render("user/home.hbs")


// })

//actualizar la foto del usuario



router.post("/profile-picture", uploader.single("image"), async(req, res, next)=>{

console.log(req.file)

try{
    await User.findByIdAndUpdate(req.session.user._id, {
        profilePic: req.file.path
    })
    res.redirect("/profile")
} catch (err){
    next (err)
}

})


//GET => ver todos los usuarios en la web

router.get("/all-users", isUserLogged, (req,res,next)=>{

    User.find ()
    .select({profilePic:1, username:1})
    .then((response)=>{

        console.log(response)

        res.render("user/all-users.hbs", {

            allUsers:response
        })


    })

    .catch((error)=>{
        
        console.log(error)


    })


})

//GET => ver detale de un usuario concreto


router.get("/all-users/:id", async (req,res,next)=>{
    
    console.log(req.params)

 try{

    const response = await User.findById (req.params.id)
    res.render("user/user-details.hbs", {
 
        oneUser:response
    })

 }catch(error){

    next(error)

 }





})






module.exports = router;