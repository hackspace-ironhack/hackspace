const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Relationship = require("../models/Relationship");
const ObjectId = require('mongoose').Types.ObjectId;

// get user by id to show as profile
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(
      {
        username: user.username,
        email:user.email,
        name: user.name,
        city: user.city,
        skills: user.skills,
        hobbies: user.hobbies,
      }));
});

router.get('/', (req, res) => {
  const query = req.query.q;
  if (query !== undefined) {
    User.find({$text: {$search :req.query.q}})
        .then(users => res.json({users}));
  } else {
    User.find().then(users => res.json({users}));
  }
});

// get contact relationship
router.get('/friends', (req, res) => {
  const id = req.user._id;
  Relationship.find({
    from: ObjectId(id)
  }).populate('from').populate('to')
    .then(friends => res.json({friends}))
    .catch(error => console.log(error));
});



// create a new relationship
router.post('/friends', (req, res) => { 
  const { friend } = req.body;
  Relationship.create({
    from: req.user._id,
    to: friend,
  })
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }));
});

module.exports = router;