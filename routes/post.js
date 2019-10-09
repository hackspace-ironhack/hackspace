const express = require ("express");
const router = express.Router();
const Post = require ("../models/Post");
const ObjectId = require('mongoose').Types.ObjectId;


//POST/api/post
router.post ("/", (req, res) => {

  Post.create({
    post:req.body.post,
    owner:req.user._id,
    postedOn: new Date(),
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

//GET/api/posts
router.get("/owner/:id", (req,res) =>{
  Post.find({owner: ObjectId(req.params.id)})
      .populate("owner")
      .then(post =>{
        res.json(post);
      }).catch(err => {
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

router.post("/like/:id", (req, res) => {
  Post.findById(req.params.id).then(post => {
    if (post.likes.indexOf(ObjectId(req.user._id)) === -1) {
      post.likes.push(req.user._id);
      post.save();
      res.json({success:true})
    } else {
      res.status(409);
      res.json({success:false});
    }
  }).catch(error => {
    console.log(error);
    res.status(500);
    res.json({success:false})
  });
});

module.exports = router;