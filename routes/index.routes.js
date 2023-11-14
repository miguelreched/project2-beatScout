const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});

const userRouter = require("./user.routes.js")
router.use("/",userRouter )

const homeRouter = require("./home.routes.js")
router.use("/", homeRouter)

const bandRouter = require("./band.routes.js")
router.use("/",bandRouter)

const followedRouter = require("./followed.routes.js")
router.use("/",followedRouter)

const profileRouter = require("./profile.routes.js")
router.use("/", profileRouter)



module.exports = router;
