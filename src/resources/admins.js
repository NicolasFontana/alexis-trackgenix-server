const express = require('express');

const router = express.Router();
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
  if (!rb.id || !rb.firstName || !rb.lastName || !rb.email || !rb.password || !rb.active) {
    res.status(400).json({ msg: 'Please include the solicited information' });
  }
  admins.push(req.body);
  res.json(admins);
});

// Delete admin
router.delete('/id=:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  if (found) {
    res.json({
      msg: 'Admin deleted', admins: admins.filter((admin) => admin.id !== Number(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

module.exports = router;
