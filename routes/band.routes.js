const express = require("express");
const Band = require("../models/Band.model");
const User = require ("../models/User.model")
const router = express.Router();
const uploader = require("../middlewares/cloudinary.middleware.js")

const {isUserLogged, isAdmin, isModerator} = require("../middlewares/user.middleware.js")

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
    res.redirect("/my-bands");
    return;
  } 
  catch (error) {
    next(error);
  }
});

//GET => ver todas las bandas en los usuarios en la web


router.get("/all-bands",isUserLogged,async (req,res,next)=>{
    
try{
  const response = await Band.find()
  
  if (req.session.user.role === "user") {
    res.render("band/all-bands.hbs", {
      allBands: response,
    });
  } else if (req.session.user.role === "moderator") {
    res.render("band/admin-all-bands.hbs", {
      allBands: response,
    });
  }

}catch(error){
        
     next(error)
  }
}) 





  router.get("/band-info/:id", async (req,res,next)=>{
    
  console.log(req.params)

  const connectedUser = req.session.user
  
   try{
  
      const response = await Band.findById(req.params.id)
      res.render("band/band-info.hbs", {
   
          oneBand:response,
          connectedUser
      })
  
   }catch(error){
  
      next(error)
  
   }
  
  
  
  
  
  })



  //POST seguir a una banda en concreto y que se imprima en la DB

  router.post("/my-bands/:userId/:myBandId", isUserLogged, async (req,res,next )=>{


    try{

      const response =await User.findByIdAndUpdate(req.params.userId, {$push:{
        favoriteBand:req.params.myBandId}})

        res.redirect(`/my-bands/${req.session.user._id}`)

    }catch(error){
      next(error)
    }


  })


  //GET añadir mis bandas favoritas a la vista
  router.get("/my-bands",isUserLogged, async (req,res,next)=>{

    try {

        const followedBand = await User.findById(req.session.user._id).populate("favoriteBand")

        res.render ("band/favorite-bands.hbs", {followedBand})



    } catch(error){

        next(error)
    }

  })


  //GET añadir mis bandas favoritas al boton del nav cuando esta mi sesion abierta
  router.get("/my-bands/:id",isUserLogged, async (req,res,next)=>{

    try {

        const followedBand = await User.findById(req.params.id).populate("favoriteBand")

        res.render ("band/favorite-bands.hbs", {followedBand})



    } catch(error){

        next(error)
    }

  })


  //POST  eliminar banda
  
router.post("/all-bands/:bandId/delete",isUserLogged,isModerator, (req,res,next)=>{
Band.findByIdAndDelete(req.params.bandId)

.then(()=>{

  res.redirect("/all-bands")


}).catch((error)=>{

  next(error)

})



})






module.exports = router;
