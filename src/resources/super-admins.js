const express = require('express');
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

// get all super admins
router.get('/getAll', (req, res) => {
  res.send(superAdmins);
});

// get super admin by id
router.get('/id/:id', (req, res) => {
  const supAdmId = Number(req.params.id);
  const userA = superAdmins.find((user) => user.id === supAdmId);
  if (userA) {
    res.send(userA);
  } else {
    res.status(400);
    res.send(`Super admin with id "${supAdmId}" does not exist`);
  }
});

// add new super admin
router.post('/add', (req, res) => {
  const newSA = req.body;
  superAdmins.push(newSA);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (error) => {
    res.send(error || ('Super admin added'));
  });
});

// delete super admin
router.delete('/delete/:id', (req, res) => {
  const supAdmId = Number(req.params.id);
  const filteredUsers = superAdmins.filter((user) => user.id !== supAdmId);
  if (superAdmins.length === filteredUsers.length) {
    res.status(400);
    res.send(`could not delete because super admin with id "${supAdmId}" does not exist`);
  } else {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(filteredUsers), (error) => {
      res.send(error || ('Super admin deleted'));
    });
  }
});

module.exports = router;
