const express = require('express');
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

// get all super admins
router.get('/', (req, res) => {
  res.send(superAdmins);
});

// get super admin by id
router.get('/id=:id', (req, res) => {
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
  if (req.body.firstName.length === 0 || req.body.lastName.length === 0
    || req.body.email.length === 0 || req.body.password.length === 0
    || req.body.active.length === 0) {
    res.send('Please fill all the required data');
  } else {
    superAdmins.push(newSA);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (error) => {
      res.send(error || ('Super admin added'));
    });
  }
});

// delete super admin
router.delete('/delete=:id', (req, res) => {
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

// edit super admin
router.put('/edit=:id', (req, res) => {
  const supAdmId = Number(req.params.id);
  const newArray = superAdmins.find((superAdmin) => superAdmin.id === supAdmId);
  const filteredArray = superAdmins.filter((superAdmin) => superAdmin.id !== supAdmId);
  if (newArray) {
    const updatedSA = {
      id: supAdmId,
      firstName: (req.body.firstName || newArray.firstName),
      lastName: (req.body.lastName || newArray.lastName),
      email: (req.body.email || newArray.email),
      password: (req.body.password || newArray.password),
      active: (req.body.active ?? newArray.active),
    };
    filteredArray.push(updatedSA);
    fs.writeFileSync('src/data/super-admins.json', JSON.stringify(filteredArray));
    res.send(`Super admin with id "${supAdmId}" edited`);
  } else {
  //  res.status(400);
    res.send(`Could not edit because super admin with id "${supAdmId}" does not exist`);
  }
});

// filter by first name
router.get('/first-name=:firstName', (req, res) => {
  const supAdmName = req.params.firstName;
  const usersA = superAdmins.filter((user) => user.firstName.toLowerCase()
  === supAdmName.toLowerCase());
  if (usersA.length === 0) {
    res.status(400);
    res.send(`Super admin with name "${supAdmName}" does not exist`);
  } else {
    res.send(usersA);
  }
});

// filter by last name
router.get('/last-name=:lastName', (req, res) => {
  const supAdmLastName = req.params.lastName;
  const usersA = superAdmins.filter((user) => user.lastName.toLowerCase()
  === supAdmLastName.toLowerCase());
  if (usersA.length === 0) {
    res.status(400);
    res.send(`Super admin with last name "${supAdmLastName}" does not exist`);
  } else {
    res.send(usersA);
  }
});

// filter by status
router.get('/active=:active', (req, res) => {
  const supAdmStatus = req.params.active;
  const usersA = superAdmins.filter((user) => JSON.stringify(user.active) === supAdmStatus);
  if (supAdmStatus !== 'true' && supAdmStatus !== 'false') {
    res.status(400);
    res.send(`${supAdmStatus} is an invalid value, please use true or false`);
  } else {
    res.send(usersA);
  }
});

module.exports = router;
