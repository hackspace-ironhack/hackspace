const express = require('express');
const router  = express.Router();
const User = require("../models/User")

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

module.exports = router;
