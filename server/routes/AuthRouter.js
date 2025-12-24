const { signUp, login } = require("../controllers/AuthController.js");
const {
  signUpValidation,
  loginValidation,
} = require("../middlewares/AuthMiddleware.js");
const upload = require("../models/fileUpload.js");
const ensureAuthenticated = require("../middlewares/Auth.js");

const router = require("express").Router();

router.post("/signup", upload.single("profilePic"), signUp);

router.post("/login", loginValidation, login);

router.get("/verify", ensureAuthenticated, (req, res) => {
  res.send({ message: "You have access!", user: req.user });
});

module.exports = router;
