const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const Task = require("../models/Task");
 
// POST /api/portfolio
// create a new `portfolio` resource
router.post("/", (req, res) => {
  // const { title, description, tasks = [] } = req.body;
  const title = req.body.title;
  const tools = req.body.tools;
  const links = req.body.links;
  const description = req.body.description;
  const tasks = [];
  const owner = req.user._id;

  Portfolio.create({
    title: title,
    tools: tools,
    description: description,
    link:link,
    tasks: tasks,
    owner: owner
  })
    .then(porfolio => {
      res.json(portfolio);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET /api/porfolio
// returns a list of all projects
router.get("/", (req, res) => {
  Project.find()
    .populate("tasks")
    .then(portfolio => {
      res.json(portfolio);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET /api/portfolio/:id
// return a specific `portfolio` resource with a given id
router.get("/:id", (req, res) => {
  // check if req.params.id is valid, if not respond with a 4xx status code
  Project.findById(req.params.id)
    .populate("tasks")
    .then(portfolio => {
      if (!portfolio) {
        res.status(404).json(portfolio);
      } else {
        res.json(portfolio);
      }
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT /api/portfolio/:id
router.put("/:id", (req, res) => {
  const { title, tools, description, link } = req.body;

  Project.findByIdAndUpdate(
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

// DELETE /api/projects/:id
router.delete("/:id", (req, res) => {
  // delete the project
  Portfolio.findByIdAndDelete(req.params.id)
    .then(portfolio => {
      // Deletes all the documents in the Task collection where the value for the `_id` field is present in the `project.tasks` array
      return Task.deleteMany({ _id: { $in: portfolio.tasks } }).then(() => {
        res.json({ message: "ok" });
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
