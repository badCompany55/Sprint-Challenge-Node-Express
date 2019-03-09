const express = require("express");

const projects = require("../data/helpers/projectModel.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const theProject = await projects.get();
    res.status(200).json(theProject);
  } catch {
    res.status(500).json({ error: "There was a problem getting the project" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const theProject = await projects.get(req.params.id);
    res.status(200).json(theProject);
  } catch {
    res.status(500).json({ error: "There was a problem getting the project" });
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const theProject = await projects.get(req.params.id);
    console.log(theProject);
    if (theProject) {
      const theActions = await projects.getProjectActions(req.params.id);
      res.status(200).json(theActions);
    } else {
      res.status(400).json({ Error: "The requested project does not exist" });
    }
  } catch {
    res.status(500).json({ Error: "Unable to retrieve actions" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.name && req.body.description) {
      const theProject = projects.insert(req.body);
      res.status(201).json(req.body);
    } else {
      res.status(400).json({ Error: "Name and Description are required" });
    }
  } catch {
    res.status(500).json({ Error: "Problem posting the project" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (req.body.name && req.body.description) {
      const testProject = await projects.get(req.params.id);
      if (testProject) {
        const theProject = await projects.update(req.params.id, req.body);
        res.status(200).json(req.body);
      } else
        res.status(400).json({ Error: "The requested Project doesn't exist" });
    } else {
      res.status(400).json({ error: "Name and Description are required" });
    }
  } catch {
    res.status(500).json({ Error: "There was a problem updated the post" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const theProject = await projects.remove(req.params.id);
    theProject
      ? res.status(200).json({ Success: "Successful Deletion" })
      : res
          .status(400)
          .json({ Error: "The requested project does not exisit" });
  } catch {
    res.status(500).json({ Error: "There was a problem deleting the post" });
  }
});

module.exports = router;
