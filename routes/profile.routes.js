const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

const uploader = require("../middlewares/cloudinary.middleware.js");

const {
  isUserLogged,
  isModerator,
} = require("../middlewares/user.middleware.js");

// ruta privada par ausuarios con sesiones activas

router.get("/all-bands", isUserLogged, (req, res, next) => {
  res.render("band/all-bands.hbs");
});

router.get("/profile", isUserLogged, async (req, res, next) => {
  try {
    const response = await User.findById(req.session.user._id)
      .populate({
        path: "followed",
        options: { limit: 3 },
      })
      .populate({
        path: "favoriteBand",
        options: { limit: 3 },
      });

    if (req.session.user.role === "user") {
      res.render("user/profile.hbs", {
        userProfile: response,
      });
    } else if (req.session.user.role === "moderator") {
      res.render("user/admin.hbs", {
        moderatorProfile: response,
      });
    }
  } catch (err) {
    next(err);
  }
});

//actualizar la foto del usuario

router.post(
  "/profile-picture",
  uploader.single("image"),
  async (req, res, next) => {
    console.log(req.file);

    try {
      await User.findByIdAndUpdate(req.session.user._id, {
        profilePic: req.file.path,
      });
      res.redirect("/profile");
    } catch (err) {
      next(err);
    }
  }
);

//GET => ver todos los usuarios en la web
router.get("/all-users", isUserLogged, async (req, res, next) => {
  try {
    const response = await User.find({
      _id: { $ne: req.session.user._id },
    }).select({ profilePic: 1, username: 1, country: 1 });

    if (req.session.user.role === "user") {
      res.render("user/all-users.hbs", {
        allUsers: response,
      });
    } else if (req.session.user.role === "moderator") {
      res.render("user/admin-all-users.hbs", {
        allUsers: response,
      });
    }
  } catch (error) {
    next(error);
  }
});

//GET => ver detalle de un usuario concreto
router.get("/all-users/:id", async (req, res, next) => {
  console.log(req.params);

  const connectedUser = req.session.user;
  console.log(connectedUser);

  try {
    const sessionResponse = await User.findById(connectedUser._id);
    console.log(sessionResponse);

    const followedUsers = [];

    sessionResponse.followed.forEach((x) => {
      followedUsers.push(x.valueOf());
    });

    console.log(followedUsers);

    const response = await User.findById(req.params.id);
    res.render("user/user-details.hbs", {
      oneUser: response,
      connectedUser,
      isFollowed: followedUsers.indexOf(req.params.id) > -1 ? true : false,
    });

    console.log(followedUsers.indexOf(req.params.id) > -1 ? true : false);
  } catch (error) {
    next(error);
  }
});

//POST=> seguir a un usuario en concreto que se imprima en la DB de users
router.post(
  "/follow/:userId/:followId",
  isUserLogged,
  async (req, res, next) => {
    console.log(req.params);

    try {
      const response = await User.findByIdAndUpdate(req.params.userId, {
        $push: { followed: req.params.followId },
      });

      res.redirect(`/followed/${req.session.user._id}`);
    } catch (error) {
      next(error);
    }
  }
);

//GET renderisa la ista de los usuarios que seguimos
router.get("/followed/:id", isUserLogged, async (req, res, next) => {
  console.log("AQUIMISMO ESTAMOS");

  try {
    console.log(req);
    console.log(res);
    const followedUser = await User.findById(req.session.user._id).populate(
      "followed"
    );

    res.render("user/followed.hbs", { followedUser });
  } catch (error) {
    next(error);
  }
});

router.get("/followed/", isUserLogged, async (req, res, next) => {
  console.log("AQUIMISMO ESTAMOS");

  try {
    console.log(req);
    console.log(res);
    const followedUser = await User.findById(req.session.user._id).populate(
      "followed"
    );

    res.render("user/followed.hbs", { followedUser });
  } catch (error) {
    next(error);
  }
});

// POST eliminar user
router.post(
  "/all-users/:userId/delete",
  isUserLogged,
  isModerator,
  (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
      .then(() => {
        res.redirect("/all-users");
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = router;
