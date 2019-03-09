const express = require("express");

const actions = require("../data/helpers/actionModel.js");
const projects = require("../data/helpers/projectModel.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const theActions = await actions.get();
    res.status(200).json(theActions);
  } catch {
    res.status(500).json({ Error: "Unable to retrieve actions" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const theActions = await actions.get(req.params.id);
    if (theActions) {
      res.status(200).json(theActions);
    } else {
      res.status(400).json({ Error: "The requested action does not exist" });
    }
  } catch {
    res.status(500).json({ Error: "There was a problem retrieving the post" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.project_id && req.body.description) {
      const theProject = await projects.get(req.body.project_id);
      if (theProject) {
        const theActions = await actions.insert(req.body);
        res.status(201).json(theActions);
      } else {
        res.staus(400).json({ Error: "The requested Project does not exist" });
      }
    }
  } catch {
    res.status(500).json({ Errr: "There was a problem posting the action" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (req.body.project_id && req.body.description) {
      const theProject = await projects.get(req.body.project_id);
      if (theProject) {
        const theActions = await actions.update(req.params.id, req.body);
        theActions == null
          ? res.status(400).json({ Error: "The requested id doesn't exist" })
          : res.status(200).json(theActions);
      } else {
        res.status(400).json({ Error: "The Request Project doesn't exist" });
      }
    } else {
      res
        .status(400)
        .json({ Error: "The project_id and description are required" });
    }
  } catch {
    res.status(500).json({ Error: "Failed to update post" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const theActions = await actions.remove(req.params.id);
    theActions
      ? res.status(200).json(theActions)
      : res.status(400).json({ Error: "No such actions" });
  } catch {
    res.status(500).json({ Error: "Failed to delete action" });
  }
});

module.exports = router;
