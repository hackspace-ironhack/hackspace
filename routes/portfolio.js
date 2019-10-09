const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const User = require("../models/User");

// POST /api/portfolio
// create a new `portfolio` resource
router.post("/:id", (req, res) => {
  // const { title, description, tasks = [] } = req.body;
  const {title, tools, description, link} = req.body;
  const owner = req.params.id;

  Portfolio.create({
    title: title,
    tools: tools,
    description: description,
    link:link,
    // tasks: tasks,
    owner: owner
  })
    .then(portfolio => {
      res.json(portfolio);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET /api/porfolio
// returns a list of all projects
router.get("/", (req, res) => {
  Portfolio.find()
    .populate("owner")
    .then(portfolio => {
      res.json(portfolio);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET /api/portfolio/:userid
router.get("/:userid", (req, res) => {
  // check if req.params.id is valid, if not respond with a 4xx status code
  const userid = req.params.userid
  Portfolio.find({owner:userid})
    .populate("owner")
    .then(portfolio => {
        res.json(portfolio);
      })
      .catch(err => {
        res.json(err);
     });
    });

// PUT /api/portfolio/:id
router.put("/:id", (req, res) => {
  const { title, tools, description, link } = req.body;

  Portfolio.findByIdAndUpdate(
    req.params.id,
    { title, tools, description, link },
    // { new: true } ensures that we are getting the updated document in the .then callback
    { new: true }
  )
    .then(portfolio => {
      res.json(portfolio);
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = router;
