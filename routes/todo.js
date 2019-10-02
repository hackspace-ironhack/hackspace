const express = require("express");
const ToDo = require("../models/ToDo");
const Project = require("../models/Project");
const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;

  ToDo.findById(id)
    .then(todo => {
      res.json(todo);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const { title, description, projectId } = req.body;

  ToDo.create({
    title,
    description,
    project: projectId
  })
    .then(todo => {
      return Project.findByIdAndUpdate(projectId, {
        $push: { todos: todo._id }
      }).then(() => {
        res.json({
          message: `Task with id ${todo._id} was successfully added to project with id ${projectId}`
        });
      });
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const { title, description } = req.body;

  ToDo.findByIdAndUpdate(id, { title, description }, { new: true })
    .then(todo => {
      res.json(todo);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  ToDo.findByIdAndDelete(id)
    .then(todo => {
      return Project.findByIdAndUpdate(todo.project, {
        $pull: { todos: id }
      }).then(() => {
        res.json({ message: "ok" });
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
