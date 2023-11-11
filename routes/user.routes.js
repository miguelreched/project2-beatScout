const express = require("express");
const User = require("../models/User.model")
const router = express.Router()
const bcrypt = require("bcryptjs")


// GET "/" => renderizar vista principal de login
router.get("/", (req, res, next)=>{
    res.render("login.hbs")
})

// POST (/profile) = recibir las credenciales del usuario, validarlo y crear una sesiòn activa

router.post("/", async (req,res,next)=>{

    console.log(req.body)

    


    // si todo bene
    res.redirect("/profile")

})


// GET "/signup" => renderizar formulario de registro
router.get("/signup", (req, res, next)=>{
    res.render("signup.hbs")
})

// POST "/signup" => recibir datos de formulario y crear el usuario en DB
router.post("/signup", async(req, res, next)=>{
    console.log(req.body)
    const{username, email, password, country} = req.body

    if (username === "" || email === "" || password === "" || country === ""){
        // console.log("All fields must be filled out")
        res.status(400).render("signup.hbs", {
            errMess: "All fields must be filled out"
        })
        return;
    }
     const passwordSeg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

    if(passwordSeg.test(password) === false){
        res.status(400).render("signup.hbs", {
            errMess: "Password is not secure enough. It should have al least 8 characters, one uppercase, one lowercase and one number"
        })
        return;
    }
     
    try {
        const repeatedMail = await User.findOne({email})
        if (repeatedMail !== null){
            res.status(400).render("signup.hbs", {
                errMess: "This email has already been used"
            })
            return
        }

        const salt = await bcrypt.genSalt(10)
        const cryptPassword = await bcrypt.hash(password, salt)

        await User.create({username, email, password: cryptPassword , country})

        res.redirect("/profile")

    }
    catch(err){
        next(err)
    }    
})







// GET "/" => renderizar vista principal de profile de usuario
router.get("/profile", (req, res, next)=>{
    res.render("user/profile.hbs")
})













module.exports = router;