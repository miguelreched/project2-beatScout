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
})













module.exports = router;