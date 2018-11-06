const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Profile Model
const Post = require("../../models/Post");
//Load Profile Model
const Profile = require("../../models/Profile");
//Load user profile
const User = require("../../models/User");

//Get post validation
const validatePostInput = require("../../validation/post");

//@route GET api/posts
//@desc GET posts
//@access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPosts: "No posts found." }));
});

//@route GET api/posts/:id
//@desc GET post by id
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noPost: "No post found with that ID" })
    );
});

//@route DELETE api/post
//@desc Delete Post
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check if post is owned by user
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ unAuth: "Not Authorized to Delete this Post" });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ noPost: "No post found with that ID" })
        );
    });
  }
);

//@route POST api/post
//@desc Create Post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

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
