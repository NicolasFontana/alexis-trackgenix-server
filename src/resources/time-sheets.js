const express = require('express');
const fs = require('fs');
const timesheet = require('../data/time-sheets.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(timesheet);
});

router.get('/id/:id', async (req, res) => {
  const timesheetID = req.params.id.toString();
  const response = timesheet.find((elem) => elem.id.toString() === timesheetID);
  if (response) {
    res.send(response);
  } else {
    res.send('Timesheet not found');
  }
});

router.get('/role/:role', async (req, res) => {
  const timesheetRole = req.body.role.toString();
  const response = timesheet.filter((elem) => elem.id.toString() === timesheetRole);
  if (response) {
    res.send(response);
  } else {
    res.send('Role not found');
  }
});

router.post('/create', (req, res) => {
  const timesheetData = req.body;
  timesheet.push(timesheetData);
  fs.writeFile('src/data/time-sheets.js', JSON.stringify(timesheet), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Timesheet created.');
    }
  });
});

// TO DELETE A TIMESHEET BY ID
router.delete('/delete/:id', (req, res) => {
  const timesheetID = req.params.id.toString();
  const filteredTimesheet = timesheet.filter((tsheet) => tsheet.id.toString() !== timesheetID);
  if (timesheet.length === filteredTimesheet.length) {
    res.send('Could NOT delete timesheet because it was not found');
  } else {
    fs.writeFile('src/data/time-sheets.js', JSON.stringify(filteredTimesheet), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Timesheet deleted.');
      }
    });
  }
});

module.exports = router;
