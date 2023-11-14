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

const othersRouter = require("./other-users.routes.js")
router.use("/",othersRouter)

const profileRouter = require("./profile.routes.js")
router.use("/", profileRouter)


module.exports = router;
