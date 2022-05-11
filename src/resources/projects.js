const express = require('express');
const fs = require('fs');

const projects = require('../data/projects.json');

const router = express.Router();

// Get all
router.get('/', (req, res) => res.json(projects));

// Get single element
// by id
router.get('/id=:id', (req, res) => {
  const found = projects.some((project) => project.id === Number(req.params.id));
  if (found) {
    res.json(projects.filter((project) => project.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});
// by name
router.get('/name=:name', (req, res) => {
  const found = projects.find((project) => project.name.toLowerCase() === req.params.name);
  if (found) {
    res.json(projects.filter((project) => project.name.toLowerCase() === req.params.name));
  } else {
    res.status(400).json({ msg: `No project with the name of ${req.params.name}` });
  }
});

// create new element
router.post('/add', (req, res) => {
  const initialValue = 0;
  const ids = projects.reduce(
    (previousValue, currentValue) => (previousValue <= currentValue.id ? currentValue.id + 1
      : previousValue),
    initialValue,
  );
  const newProject = {
    id: ids,
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    clientName: req.body.clientName,
    active: true,
    devRate: req.body.devRate,
    qaRate: req.body.qaRate,
    pmRate: req.body.pmRate,
    tlRate: req.body.tlRate,
    devs: req.body.devs,
    qas: req.body.qas,
    projectManager: req.body.projectManager,
    techLeader: req.body.techLeader,
    admin: req.body.admin,
  };
  if (!(newProject.name && newProject.description && newProject.endDate
 && newProject.startDate && newProject.clientName && newProject.devRate && newProject.qaRate
  && newProject.pmRate && newProject.tlRate && newProject.devs && newProject.qas
  && newProject.projectManager && newProject.techLeader && newProject.admin)) {
    res.status(400).json({ msg: 'Please fill in all fields' });
  } else {
    projects.push(newProject);
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('New project added');
      }
    });
  }
});

// Update Project
router.put('/update=:id', (req, res) => {
  const idProject = Number(req.params.id);
  const found = projects.find((project) => project.id === idProject);
  const updProjectFilter = projects.filter((project) => project.id !== idProject);
  const newProject = {
    id: Number(req.params.id),
    name: (req.body.name || found.name),
    description: (req.body.description || found.description),
    startDate: (req.body.startDate || found.startDate),
    endDate: (req.body.endDate || found.endDate),
    clientName: (req.body.clientName || found.clientName),
    active: (req.body.active || found.active),
    devRate: (req.body.devRate || found.devRate),
    qaRate: (req.body.qaRate || found.qaRate),
    pmRate: (req.body.pmRate || found.pmRate),
    tlRate: (req.body.tlRate || found.tlRate),
    devs: (req.body.devs || found.devs),
    qas: (req.body.qas || found.qas),
    projectManager: (req.body.projectManager || found.projectManager),
    techLeader: (req.body.techLeader || found.techLeader),
    admin: (req.body.admin || found.admin),
  };
  if (!(found)) {
    res.status(400).json({ msg: 'Please fill in a valid id' });
  } else {
    updProjectFilter.push(newProject);
    fs.writeFile('src/data/projects.json', JSON.stringify(updProjectFilter), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project updated');
      }
    });
  }
});

// //Alternative put
// router.put('/update/:id', (req,res) => {
//   const id = request.params.id
//   const findProjectById = (updProject, id) => {
//     for ( let i = 0; i < updProject.length, i++;) {
//       if (updProject[i].id === id){
//         return i
//       }
//       return -1
//       }
//     }
//   },
//   fs.readFile('../data/projects.json', (err, data) =>{
//     if (err) {
//       return res.status(400).send('Sorry, something went wrong');
//     }

//     const update = JSON.parse(data);
//     const updIndex = findProjectById(update, id);

//     if (updIndex === -1) {
//       return res.status(400).send('Sorry, something went wrong');
//     }
//     return res.json(update[updIndex]);
//   })
// );

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
