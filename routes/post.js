const express = require ("express");
const router = express.Router();
const Post = require ("../models/Post");
const User = require ("../models/User");


//POST/api/post
router.post ("/", (req, res) => {
  const post = req.body.post;
  const owner = req.user._id;
  

  Post.create({
    post:post,
    owner:owner
  })
  .then(post => {
    res.json(post);
  })
  .catch(err => {
    res.json(err);
  });
});

//GET/api/posts

router.get("/", (req,res) =>{
  Post.find().populate("owner").then(post =>{
    res.json(post);
  })
  .catch(err => {
    res.json(err);
  });
});

//GET/api/post/:id
router.get("/:id", (req,res) =>{
  Post.findById(req.params.id).populate("owner")
  .then(post => {
    res.json(post);
  })
  .catch(err => {
    res.json(err);
  });
});

// PUT /api/projects/:id
router.put("/:id", (req, res) => {
  const { post } = req.body;

  Post.findByIdAndUpdate(
    req.params.id,
    { post },
    { new: true } // gives the updated info
  )
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;