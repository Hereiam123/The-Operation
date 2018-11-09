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

//@route DELETE api/posts
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

//@route POST api/posts
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

//@route POST api/posts/like/:id
//@desc Like a post
//@access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ postFound: "User already liked this post" });
          }
          //Add user id to likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ noPost: "No post found with that ID" })
        );
    });
  }
);

//@route POST api/posts/unlike/:id
//@desc Unlike a post
//@access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ postFound: "User has not liked this post" });
          }
          //Remove user from likes array
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ noPost: "No post found with that ID" })
        );
    });
  }
);

//@route POST api/posts/comment/:id
//@desc Add comment to post
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check Validation
    if (!isValid) {
      //If errors, send 400 status with errors
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add to comments array
        post.comments.unshift(newComment);
        post
          .save()
          .then(post => res.json(post))
          .catch(err => res.status(404).json({ noPost: "Post not found" }));
      })
      .catch(err =>
        res.status(404).json({ noPost: "No post found with that ID" })
      );
  }
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc Delete comment from post
//@access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ noComment: "No comment with that id exists" });
        }
        //Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ noPost: "No post found with that ID" })
      );
  }
);

module.exports = router;
