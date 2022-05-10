const express = require('express');
const fs = require('fs');

const router = express.Router();
const projects = require('../data/projects.json');

// Get all
router.get('/', (req, res) => res.json(projects));

// Get single element
// by id
router.get('/id/:id', (req, res) => {
  const found = projects.some((project) => project.id === Number(req.params.id));
  if (found) {
    res.json(projects.filter((project) => project.id === Number(req.params.id)));
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
router.put('/id/:id', (req, res) => {
  const found = projects.find((updProject) => updProject.id === req.params.id);
  const {
    name, description, startDate, endDate, clientName, active, devRate, qaRate,
    pmRate, tlRate, devs, qas, projectManager, techLeader, admin,
  } = req.body;
  const newObject = {
    name: (name || found.name),
    description: (description || found.description),
    startDate: (startDate || found.startDate),
    endDate: (endDate || found.endDate),
    clientName: (clientName || found.clientName),
    active: (active || found.active),
    devRate: (devRate || found.devRate),
    qaRate: (qaRate || found.qaRate),
    pmRate: (pmRate || found.pmRate),
    tlRate: (tlRate || found.tlRate),
    devs: (devs || found.devs),
    qas: (qas || found.qas),
    projectManager: (projectManager || found.projectManager),
    techLeader: (techLeader || found.techLeader),
    admin: (admin || found.admin),
  };
  if (newObject) {
    res.send(newObject);
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

// Assigning a new employee with Dev role
router.put('/assign/dev/:id', (req, res) => {
  const projectRole = projects.find((project) => project.id === Number(req.params.id));
  if (projectRole !== undefined) {
    const devs = projects.filter((project) => project.devs === Number(req.params.devs));
    const newEmployee = {
      devs: (devs || projectRole),
    };
    projectRole.devs.push(req.body.devs);
    devs.push(req.body);
    res.send(newEmployee);
  } else {
    res.status(400).json({ msg: `No valid project with the id of ${req.params.id}` });
  }
});

// Assigning a new employee with Qas role
router.put('/assign/qas/:id', (req, res) => {
  const projectRole = projects.find((project) => project.id === Number(req.params.id));
  if (projectRole !== undefined) {
    const qas = projects.filter((project) => project.qas === Number(req.params.qas));
    const newEmployee = {
      qas: (qas || projectRole),
    };
    projectRole.qas.push(req.body.qas);
    qas.push(req.body);
    res.send(newEmployee);
  } else {
    res.status(400).json({ msg: `No valid project with the id of ${req.params.id}` });
  }
});

// Assigning a new employee with PM role
router.put('/assign/pm/:id', (req, res) => {
  const projectRole = projects.find((project) => project.id === Number(req.params.id));
  if (projectRole !== undefined) {
    const projectManager = projects.filter((project) => project.projectManager
    === Number(req.params.projectManager));
    const newEmployee = {
      projectManager: (projectManager || projectRole),
    };
    projectRole.projectManager.push(req.body.projectManager);
    projectManager.push(req.body);
    res.send(newEmployee);
  } else {
    res.status(400).json({ msg: `No valid project with the id of ${req.params.id}` });
  }
});

// Assigning a new employee with tl role
router.put('/assign/tl/:id', (req, res) => {
  const projectRole = projects.find((project) => project.id === Number(req.params.id));
  if (projectRole !== undefined) {
    const techLeader = projects.filter((project) => project.techLeader
    === Number(req.params.techLeader));
    const newEmployee = {
      techLeader: (techLeader || projectRole),
    };
    projectRole.techLeader.push(req.body.techLeader);
    techLeader.push(req.body);
    res.send(newEmployee);
  } else {
    res.status(400).json({ msg: `No valid project with the id of ${req.params.id}` });
  }
});

// Assigning a new employee with admin role
router.put('/assign/admin/:id', (req, res) => {
  const projectRole = projects.find((project) => project.id === Number(req.params.id));
  if (projectRole !== undefined) {
    const admin = projects.filter((project) => project.admin
    === Number(req.params.admin));
    const newEmployee = {
      admin: (admin || projectRole),
    };
    projectRole.admin.push(req.body.admin);
    admin.push(req.body);
    res.send(newEmployee);
  } else {
    res.status(400).json({ msg: `No valid project with the id of ${req.params.id}` });
  }
});
module.exports = router;
