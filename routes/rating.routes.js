const express = require("express");
const User = require("../models/User.model.js")
const Band = require("../models/Band.model");
const Rating = require("../models/Band.model");
const router = express.Router()

const {isUserLogged, isAdmin} = require("../middlewares/user.middleware.js")



//POST crear el rating pa pasar el rating

router.post("/create/:id", async (req,res,next)=>{

    const { rating } = req.body;
    const band = req.params.id;
    const user = req.session.user._id;
    const newRating = {
    rating,
    beach,
    user,
  };
  try {
    await Rating.create(newRating);
    res.redirect(`${band}/info`);
  } catch (err) {
    next(err);
  }
});














module.exports = router;