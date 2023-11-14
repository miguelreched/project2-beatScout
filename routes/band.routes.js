const express = require("express");
const Band = require("../models/Band.model");
const router = express.Router();

const {isUserLogged, isAdmin} = require("../middlewares/user.middleware.js")

// GET /"add-bands" nos lleva a añadir  bandas a nuestra lista
// router.get("/add-bands", (req, res, next) => {
//   res.render("band/add-bands.hbs");
// });

router.get("/add-bands",isUserLogged, (req,res,next)=>{
    
  res.render("band/add-bands.hbs")


})



// POST "/add-bands" => recibir los datos del formulario y crear banda en la DB

router.post("/add-bands", async (req, res, next) => {
  console.log(req.body);
  const { name, genre, info, socialMedia } = req.body;

  if (name === "" || genre === "" || info === "" || socialMedia === "") {
    res.status(400).render("add-bands.hbs", {
      errMess: "All fields must be filled out",
    });
    return;
  }

  try {
    const repeatedBand = await Band.findOne({ name });
    if (repeatedBand !== null) {
      res.status(400).render("add-bands.hbs", {
        errMess: "This band has already been created",
      });
      return;
    }

    await Band.create({ name, genre, info, socialMedia });
    res.redirect("/favorite-bands");
    return;
  } catch (error) {
    next(error);
  }
});

// GET "/favorite band" nos lleva a ver a nuestras bandas faoritas

// router.get("/favorite-bands", (req, res, next) => {
//   res.render("band/favorite-bands.hbs");
// });



// const {isUserLogged, isAdmin} = require("../middlewares/user.middleware.js")

// router.get("/profile",isUserLogged, (req,res,next)=>{
    

//     Band.findById(req.session.band._id)
//     .then((response)=>{
//         console.log(response)
//         res.render("band/favorite-band.hbs", {
//         bandProfile: response})
//     })
//     .catch((err)=> next(err))
//     })






router.get("/favorite-bands",isUserLogged, (req,res,next)=>{
    
  res.render("band/favorite-bands.hbs")


})

module.exports = router;
