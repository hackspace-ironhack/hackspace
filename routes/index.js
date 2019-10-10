const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const uploader = require("../configs/cloudinary");
const multer = require('multer');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//PATCH api/about
router.patch('/api/about/:id', (req, res) => {
  const id = req.params.id;
  const { name, city, skills, hobbies } = req.body;
  User.findOneAndUpdate({ _id: id }, { name: name, city: city, skills: skills, hobbies: hobbies })
    .then(user => {
      console.log("user was updated: ", user)
      res.json({ message: "user updated" })
    })
    .catch(err => console.log(err))
})

//GET api/about
router.get('/api/about/:id', (req, res) => {
  const id = req.params.id
  User.findOne({ _id: id })
    .then(user => {
      res.json(user)
    })
    .catch(err => console.log(err))
})

router.get('/api/post/:owner', (req, res) => {
  const owner = req.params.owner;
  Post.find({ owner: owner })
    .then(post => {
      console.log("all the posts : ", post)
      res.json(post)
    })
    .catch(err => console.log(err))
})

//PATCH image

router.post("/add/image", uploader.single("profilePicture"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded"));
    return
  }

  res.json({ secure_url: req.file.secure_url })
})


router.post("/api/profilePicture/:id", (req, res) => {
  // see how to return the updated user
  User.findByIdAndUpdate(req.params.id, { profilePicture: req.body.profilePicture }, {new: true}).then((user) => {
    res.json(user)
  })
})


// POST Media

router.post("/add/media", uploader.single("uploadedMedia"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No media uploaded"));
    return
  }

  res.json({ secure_url: req.file.secure_url })
})


router.post("/api/uploadedMedia/:id", (req, res) => {
  // see how to return the updated user
  console.log(req.body.uploadedMedia)
  User.findByIdAndUpdate(req.params.id, { $push: { uploadedMedia: req.body.uploadedMedia } }, { new: true }).then((user) => {
    res.json(user)
  })
})



module.exports = router;
