const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});




const userRouter = require("./user.routes.js")
router.use("/signup",userRouter )

module.exports = router;
