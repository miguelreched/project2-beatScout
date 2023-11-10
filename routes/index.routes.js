const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});

const userRouter = require("./user.routes.js")
router.use("/user",userRouter )

// const bandRouter = require("./band.routes.js")
// router.use("/band",bandRouter)

module.exports = router;
