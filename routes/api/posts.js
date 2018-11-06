const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Profile Model
const Post = require("../../models/Post");
//Load user profile
const User = require("../../models/User");

//Get post validation
const validatePostInput = require("../../validation/post");

//@route POST api/post
//@desc Create Post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isVaild } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
      //If errors, send 400 status with errors
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
