const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const bcrypt = require("bcryptjs");



// GET "/" => renderizar vista principal de login
router.get("/", (req, res, next) => {
  res.render("login.hbs");
});


// POST (/profile) = recibir las credenciales del usuario, validarlo y crear una sesiòn activa

router.post("/", async (req, res, next) => {
  console.log(req.body);
  const {username, password} = req.body

  //validar que los campos estén llenos

  if(username === "" || password === "") {
    
    // si todo bene
    res.status(400).render("index.hbs", {

      errMess: "All fields must be filled"

    });
    return // aqui detiene la ruta si no funciona

  }

  
  try{
    
    // validar que el usuario exista

    const foundUser = await User.findOne ( {username} )

    if(foundUser === null) {

      res.status(400).render("index.hbs", {

        errMess: "User doesn't exists"

      })
      return

    }

    //validar que la contraseña sea la correcta

    const isPasswordValid = await bcrypt.compare(password,foundUser.password)
    console.log("isPasswordValid", isPasswordValid)
    if(isPasswordValid == false) {

      res.status(400).render("index.hbs", {

        errMess: "Password not valid"
      })
      return

    }

    //usuario validado
    // crear una sesión activa

    const sessionInfo = {

      _id: foundUser._id,
      email: foundUser.email,

    }

      req.session.user = sessionInfo

      req.session.save(()=>{

        res.redirect("/home")


      })



    
  }catch(error){
    
    next (error)
  }
  

  
});



// GET "/" => cierra sesion del usuario

router.get("/logout", (req,res,next) =>{

  req.session.destroy (()=>{

    res.redirect("/")
  })

})



//! Aqui empieza el signup


// GET "/signup" => renderizar formulario de registro
router.get("/signup", (req, res, next) => {
  res.render("signup.hbs");
});

// POST "/signup" => recibir datos de formulario y crear el usuario en DB
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { username, email, password, country } = req.body;

  if (username === "" || email === "" || password === "" || country === "") {
    // console.log("All fields must be filled out")
    res.status(400).render("signup.hbs", {
      errMess: "All fields must be filled out",
    });
    return;
  }
  const passwordSeg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (passwordSeg.test(password) === false) {
    res.status(400).render("signup.hbs", {
      errMess:
        "Password is not secure enough. It should have al least 8 characters, one uppercase, one lowercase and one number",
    });
    return;
  }

  try {

    const repeatedUsername = await User.findOne({ username });
    if (repeatedUsername !== null) {
      res.status(400).render("signup.hbs", {
        errMess: "This username already exists",
      });
      return;
    }

    const repeatedMail = await User.findOne({ email });
    if (repeatedMail !== null) {
      res.status(400).render("signup.hbs", {
        errMess: "This email has already been used",
      });
      return;
    }
  

    const salt = await bcrypt.genSalt(10);
    const cryptPassword = await bcrypt.hash(password, salt);

    await User.create({ username, email, password: cryptPassword, country });

    res.redirect("/home");
  } catch (err) {
    next(err);
  }
});

// // GET "/" => renderizar vista principal de profile de usuario
// router.get("/profile", (req, res, next) => {
//   res.render("user/profile.hbs");
// });

module.exports = router;
