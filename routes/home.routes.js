const express = require("express");
const User = require("../models/User.model");
const router = express.Router();

const { isUserLogged, isAdmin } = require("../middlewares/user.middleware.js");

// /GET "/home" => renderizar la vista  de la home
router.get("/home", isUserLogged, (req, res, next) => {
  res.render("user/home.hbs");
});

module.exports = router;
