const express = require('express');

const router = express.Router();
const fs = require('fs');
const admins = require('../data/admins.json');

// Get all admins
router.get('/', (req, res) => res.status(200).json(admins));

// Get single admin
router.get('/id=:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  if (found) {
    res.json(admins.filter((admin) => admin.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

// Create admin
router.post('/', (req, res) => {
  const rb = req.body;
  if (!rb.id || !rb.firstName || !rb.lastName || !rb.email || !rb.password || (rb.active === '')) {
    res.status(400).json({ msg: 'Please include the solicited information' });
  }
  admins.push(req.body);
  const adminsWithNew = admins;
  fs.writeFile('src/data/admins.json', JSON.stringify(adminsWithNew), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        msg: 'Admin created', admins: adminsWithNew,
      });
    }
  });
});

// Delete admin
router.delete('/id=:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  const restOfTheAdmins = admins.filter((admin) => admin.id !== Number(req.params.id));
  if (found) {
    fs.writeFile('src/data/admins.json', JSON.stringify(restOfTheAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          msg: 'Admin deleted', admins: restOfTheAdmins,
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

// Update admin
router.put('/id=:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  if (found) {
    const restOfTheAdmins = admins.filter((admin) => admin.id !== Number(req.params.id));
    const copyOfAdmin = admins.find((admin) => admin.id === Number(req.params.id));
    const {
      firstName, lastName, email, password, active,
    } = req.body;
    const updatedAdmin = {
      id: Number(req.params.id),
      firstName: (firstName || copyOfAdmin.firstName),
      lastName: (lastName || copyOfAdmin.lastName),
      email: (email || copyOfAdmin.email),
      password: (password || copyOfAdmin.password),
      active: Boolean(active ?? copyOfAdmin.active),
    };
    restOfTheAdmins.push(updatedAdmin);
    fs.writeFile('src/data/admins.json', JSON.stringify(restOfTheAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ msg: 'Admin updated', admins: restOfTheAdmins });
      }
    });
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

module.exports = router;
