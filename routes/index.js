const express = require('express');
const router  = express.Router();
const User = require("../models/User")
const Post = require("../models/Post")
const uploader = require("./cloudinary")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//PATCH api/about
router.patch('/api/about/:id', (req,res)=>{
  const id = req.params.id;
  const {name, city, skills, hobbies} = req.body;
  User.findOneAndUpdate({_id:id},{name:name, city:city, skills:skills, hobbies:hobbies})
  .then(user=>{
    console.log("user was updated: ", user)
    res.json({message:"user updated"})
  })
  .catch(err=>console.log(err))
})

//GET api/about
router.get('/api/about/:id', (req,res)=>{
  const id = req.params.id
  User.findOne({_id:id})
  .then(user =>{
    res.json(user)
  })
  .catch(err=>console.log(err))
})

//POST api/profile
router.post('/api/post', (req,res)=>{
  const {post, owner} = req.body;
  Post.create({post,owner})
  .then(post =>{
    res.json(post)
  })
  .catch(err=>console.log(err)) 
})

router.get('/api/post/:owner',(req,res) =>{
  const owner = req.params.owner;
  Post.find({owner:owner})
  .then(post =>{
    console.log("all the posts : ", post)
    res.json(post)
  })
  .catch(err=>console.log(err)) 
})

//PATCH image
router.patch('/api/profilepicture/:id', uploader.single('photo'), (req, res, next) => {
  //const { title, description } = req.body;
  const id= req.param.id
  const imgPath = req.file.url;
  //const imgName = req.file.originalname;

  User.findOneAndUpdate({_id:id},{profilePicture:imgPath})
  .then(user => {
    res.status(200).json({message:"updated image"});
  })
  .catch(error => {
    console.log(error);
  })
});), 



module.exports = router;
