import express from 'express';
import fs from 'fs';
import admins from '../data/admins.json';

const router = express.Router();

// Get all admins
router.get('/', (req, res) => res.status(200).json(admins));

// Get single admin by id
router.get('/id/:id', (req, res) => {
  const found = admins.find((admin) => admin.id === Number(req.params.id));
  if (found) {
    res.json(admins.filter((admin) => admin.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

// Get admins by firstName
router.get('/firstName/:firstName', (req, res) => {
  const found = admins.some((admin) => admin.firstName === req.params.firstName);
  if (found) {
    res.json(admins.filter((admin) => admin.firstName === req.params.firstName));
  } else {
    res.status(400).json({ msg: `No admins with the firstName of ${req.params.firstName}` });
  }
});

// Get admins by lastName
router.get('/lastName/:lastName', (req, res) => {
  const found = admins.some((admin) => admin.lastName === req.params.lastName);
  if (found) {
    res.json(admins.filter((admin) => admin.lastName === req.params.lastName));
  } else {
    res.status(400).json({ msg: `No admins with the lastName of ${req.params.lastName}` });
  }
});

// Get admins by active status
router.get('/active/:active', (req, res) => {
  const listOfActives = admins.filter((admin) => (admin.active.toString() === req.params.active));
  if (req.params.active === 'true' || req.params.active === 'false') {
    res.json(listOfActives);
  } else {
    res.status(400).json({ msg: `No admins with the active of ${req.params.active}` });
  }
});

// Create admin
router.post('/', (req, res) => {
  const rb = req.body;
  const ids = admins.reduce((previousValue, currentValue) => (previousValue
     <= currentValue.id ? currentValue.id + 1 : previousValue), 0);
  if (!ids || !rb.firstName || !rb.lastName || !rb.email || !rb.password || (rb.active == null)) {
    res.status(400).json({ msg: 'Please include the solicited information' });
  }

  admins.push({ id: ids, ...req.body });
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
router.delete('/id/:id', (req, res) => {
  const found = admins.find((admin) => admin.id === Number(req.params.id));
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
router.put('/id/:id', (req, res) => {
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

export default router;
