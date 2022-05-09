const express = require('express');
const fs = require('fs');

const router = express.Router();
const projects = require('../data/projects.json');

// Get all
router.get('/', (req, res) => res.json(projects));

// Get single element
// by id
router.get('/id/:id', (req, res) => {
  const foundget = projects.find((project) => project.id === req.params.id);
  if (foundget) {
    res.send(foundget);
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});
// by name
router.get('/name/:name', (req, res) => {
  const found = projects.find((project) => project.name === req.params.name);
  if (found) {
    res.send(found);
  } else {
    res.status(400).json({ msg: `No project with the name of ${req.params.name}` });
  }
});

// create new element
router.post('/add', (req, res) => {
  const newProject = req.body;
  projects.push(newProject);
  fs.writeFile('/src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Project created');
    }
  });
  res.send('KOP');
});

// Update Project
// router.put('/id/:id', (req, res) => {
//   const found = projects.find((updProject) => updProject.id === req.params.id);
//   if (found) {
//     const updp = req.body;
//     projects.forEach((project) => {
//       if (project.id === req.params.id) {
//         project.name = updp.name ? updp.name : updp.name;
//         project.description = updp.description ? updp.description : project.description;
//         project.startDate = updp.startDate ? updp.startDate : project.startDate;
//         project.endDate = updp.endDate ? updp.endDate : project.endDate;
//         project.clientName = updp.clientName ? updp.clientName : project.clientName;
//         project.active = updp.active ? updp.active : project.active;
//         project.devRate = updp.devRate ? updp.devRate : project.devRate;
//         project.qaRate = updp.qaRate ? updp.qaRate : project.qaRate;
//         project.pmRate = updp.pmRate ? updp.pmRate : project.pmRate;
//         project.tlRate = updp.tlRate ? updp.tlRate : project.tlRate;
//         project.devs = updp.devs ? updp.devs : project.devs;
//         project.qas = updp.qas ? updp.qas : project.qas;
//         project.projectManager = updp.projectManager ? updp.projectManager
//           : project.projectManager;
//         project.techLeader = updp.techLeader ? updp.techLeader : project.techLeader;
//         project.admin = updp.admin ? updp.admin : project.admin;
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
//   }
// });
module.exports = router;
