const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Relationship = require("../models/Relationship");
const ObjectId = require('mongoose').Types.ObjectId;

// get user by id to show as profile
router.get('/:id', (req, res) => {
  // Post.find({owner: req.params.id})
  User.findById(req.params.id)
    .then(user => res.json(
      {
        username: user.username,
        _id: user._id,
        email:user.email,
        name: user.name,
        city: user.city,
        skills: user.skills,
        hobbies: user.hobbies,
        profilePicture: user.profilePicture,
        uploadedMedia: user.uploadedMedia
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

router.get('/friends/:id', (req, res) => {
    const id = req.user._id;
    const friendId = req.params.id;
    Relationship.findOne({
        from: ObjectId(id),
        to: ObjectId(friendId),
    }).then(friends => res.json(friends))
      .catch(error => console.log(error));
});



// create a new relationship
router.post('/friends', (req, res) => {
    const { friend } = req.body;
    const relationShip = {
        from: req.user._id,
        to: friend,
    };
  Relationship.update(relationShip, relationShip, {upsert: true})
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }));
});

// removed the relationship
router.delete('/friends', (req, res) => {
    const { friend } = req.body;
    const relationShip = {
        from: req.user._id,
        to: friend,
    };
    Relationship.findOneAndRemove(relationShip)
        .then(() => res.json({ success: true }))
        .catch(() => res.json({ success: false }));
});

module.exports = router;