const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const express = require("express");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

router.post("/", [auth, admin, validate(validateUser)], async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(409).send("There is already a user with this email.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
