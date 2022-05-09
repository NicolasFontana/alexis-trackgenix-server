// IMPORTS AND REQUIRES
const express = require('express');

const router = express.Router();
// const fs = require('fs');

// JSON DATA
const timesheet = require('../data/time-sheets.json');

// GET ALL TIME SHEETS
router.get('/', async (req, res) => {
  await res.status(200).json(timesheet);
});

// GET A SPECIFIC TS
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  const response = await timesheet.find((elem) => elem.id.toString() === id.toString());
  res.status(200).json(response ?? { success: false, msg: 'Id was not found' });
});

// GET TIME SHEETS ACCORDING TO VALIDATION
// req could be 0 -> false or 1 -> true
router.get('/validation/:valid', async (req, res) => {
  const isValid = (req.params.valid === '1' || req.params.valid === '0' ? req.params.valid === '1' : 'Invalid input');
  if (isValid === 'Invalid input') {
    res.status(400).json({ success: false, msg: isValid });
  }

  const response = await timesheet.filter((elem) => elem.validated === isValid);
  res.status(200).json(response);
});

// GET TIME SHEETS FROM A SPECIFIC PROJECT
router.get('/project/:id', async (req, res) => {
  const { id } = req.params;
  const response = await timesheet.filter((elem) => elem.projectId.toString() === id.toString());
  if (response.length === 0) {
    res.status(400).json({ success: false, msg: 'No such project' });
  } else {
    res.status(200).json(response);
  }
});

// GET TIME SHEETS FROM A SPECIFIC ROLE
router.get('/role/:role', async (req, res) => {
  const { role } = req.params;
  const response = await timesheet.filter((elem) => elem.role === role);
  if (response.length === 0) {
    res.status(400).json({ success: false, msg: 'No such role' });
  } else {
    res.status(200).json(response);
  }
});

module.exports = router;
