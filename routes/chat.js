const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Relationship = require("../models/Relationship");
const ObjectId = require('mongoose').Types.ObjectId;

// get contact relationship
router.get('/', (req, res) => {
  const id = req.user._id;
  Relationship.find({
    from: ObjectId(id)
  }).populate('from').populate('to')
    .then(friends => res.json({friends}))
    .catch(error => console.log(error));
});

// get list of all messages between 2 users
router.get('/messages/:id', (req, res) => {
  Message.find({
    $or: [
      {
        'from': ObjectId(req.user._id),
        'to': ObjectId(req.params.id)
      },
      { 
        'from': ObjectId(req.params.id),
        'to': ObjectId(req.user._id)
      },
    ]
  }).populate('from')
    .populate('to')
    .then(messages => res.json({ messages }));
});

// create a new message between 2 users
router.post('/messages/:id', (req, res) => { 
  const { message } = req.body;
  Message.create({
    from: req.user._id,
    to: req.params.id,
    message,
    sentOn: new Date()
  })
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }));
});

module.exports = router;