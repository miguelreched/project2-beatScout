const express = require("express");
const User = require("../models/User.model")
const router = express.Router()
const bcrypt = require("bcryptjs")

// GET "/signup" => renderizar formulario de registro
router.get("/signup", (req, res, next)=>{
    res.render("signup.hbs")
})

// POST "/signup" => recibir datos de formulario y crear el usuario en DB
router.post("/signup", async(req, res, next)=>{
    console.log(req.body)
    const{username, email, password, country} = req.body

    if (username === "" || email === "" || password === "" || country === ""){
        console.log("All fields must be filled out")
    }
})













module.exports = router;