const express = require("express");
const Band = require("../models/Band.model");
const router = express.Router();
const uploader = require("../middlewares/cloudinary.middleware.js")

const {isUserLogged, isAdmin} = require("../middlewares/user.middleware.js")

// GET /"add-bands" nos lleva a añadir  bandas a nuestra lista
// router.get("/add-bands", (req, res, next) => {
//   res.render("band/add-bands.hbs");
// });

router.get("/add-bands",isUserLogged, (req,res,next)=>{
    
  res.render("band/add-bands.hbs")


})



// POST "/add-bands" => recibir los datos del formulario y crear banda en la DB

router.post("/add-bands", uploader.single("image"), async (req, res, next) => {
  console.log(req.body);
  // console.log(req.file.path)


  if (req.body.bandName === "" || req.body.genre === "" ||req.body.info === "" || req.body.instagramUrl === "" || req.body.facebookUrl === "" || req.body.spotifyUrl === "") {
    res.status(400).render("add-bands.hbs", {
      errMess: "All fields must be filled out",
    });
    return;
  }

  try {
  
    await Band.create({ 
      name: req.body.bandName, 
      genre: req.body.genre, 
      info: req.body.info, 
      instagramUrl: req.body.instagramUrl,
      facebookUrl: req.body.facebookUrl,
      spotifyUrl: req.body.spotifyUrl,
      bandPic: req.file.path 
    });
    res.redirect("/favorite-bands");
    return;
  } 
  catch (error) {
    next(error);
  }
});

//GET => ver todas las bandas en los usuarios en la web


router.get("/favorite-bands",isUserLogged, (req,res,next)=>{
    

    Band.find()
    .select({bandPic:1, name:1})
    .then((response)=>{
        console.log(response)
        res.render("band/favorite-bands.hbs", {
        allBands: response})
    })
    .catch((err)=> next(err))
    })

module.exports = router;
