const express = require('express');

const router = express.Router();
const projects = require('../data/projects.json');

/// / GET ALL ELEMENTS
router.get('/', (req, res) => res.json(projects));

/// / GET SOME ELEMENT
///  BY ID
router.get('/id/:id', (req, res) => {
  const found = projects.some((project) => project.id === Number(req.params.id));
  if (found) {
    res.json(projects.filter((project) => project.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

/// BY NAME
router.get('/name/:name', (req, res) => {
  const found = projects.find((project) => project.name === req.params.name);
  if (found) {
    res.json(projects.filter((project) => project.name === req.params.name));
  } else {
    res.status(400).json({ msg: `No project with the name of ${req.params.name}` });
  }
});

/// BY CLIENT NAME
router.get('/clientName/:clientName', (req, res) => {
  const found = projects.find((project) => project.clientName === req.params.clientName);
  if (found) {
    res.json(projects.filter((project) => project.clientName === req.params.clientName));
  } else {
    res.status(400).json({ msg: `No project with the client name of ${req.params.clientName}` });
  }
});

/// BY ACTIVE/INACTIVE
router.get('/active', (req, res) => {
  const found = projects.find((project) => project.active === true);
  if (found) {
    res.json(projects.filter((project) => project.active === true));
  } else {
    res.status(400).json({ msg: `No project with the name of ${req.params.active}` });
  }
});

/// /DELETE PROJECT
router.delete('/delete/:id', (req, res) => {
  const found = projects.some((project) => project.id === Number(req.params.id));
  if (found) {
    res.json({
      msg: 'Project deleted',
      projects: projects.filter((project) => project.id !== Number(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

module.exports = router;
