const express = import('express');

const fs = import('fs');

const router = express.Router();
const projects = import('../data/projects.json');

/// / GET ALL ELEMENTS
router.get('/', (req, res) => res.json(projects));

/// / GET SOME ELEMENT
///  BY ID
router.get('/id=:id', (req, res) => {
  const found = projects.some((project) => project.id === Number(req.params.id));
  if (found) {
    res.json(projects.filter((project) => project.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

/// BY NAME
router.get('/name=:name', (req, res) => {
  const found = projects.find((project) => project.name.toLowerCase()
   === req.params.name.toLowerCase());
  if (found) {
    res.json(projects.filter((project) => project.name.toLowerCase()
     === req.params.name.toLowerCase()));
  } else {
    res.status(400).json({ msg: `No project with the name of ${req.params.name}` });
  }
});

/// BY CLIENT NAME
router.get('/clientName=:clientName', (req, res) => {
  const found = projects.find((project) => project.clientName.toLowerCase()
   === req.params.clientName.toLowerCase());
  if (found) {
    res.json(projects.filter((project) => project.clientName.toLowerCase()
     === req.params.clientName.toLowerCase()));
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
router.delete('/delete=:id', (req, res) => {
  const found = projects.some((project) => project.id === Number(req.params.id));
  if (found) {
    const filteredProjects = projects.filter((project) => project.id !== Number(req.params.id));
    fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Projects updated');
      }
    });
    res.json({ msg: 'Project deleted' });
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

module.exports = router;
