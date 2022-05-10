// IMPORT & REQUIRES
const express = require('express');
const fs = require('fs');

const router = express.Router();

// DATA IN JSON
const timesheet = require('../data/time-sheets.json');

router.get('/', (req, res) => {
  res.send(timesheet);
});

// TO SEE A TIMESHEET BY ID
router.get('/id/:id', async (req, res) => {
  const timesheetID = req.params.id.toString();
  const response = timesheet.find((elem) => elem.id.toString() === timesheetID);
  if (response) {
    res.send(response);
  } else {
    res.send(`Timesheet ${timesheetID} not found`);
  }
});

// TO SEE A TIMESHEET BY ROLE
router.get('/role/:role', async (req, res) => {
  const timesheetRole = req.body.role.toString();
  const response = timesheet.filter((elem) => elem.role.toString() === timesheetRole);
  if (response) {
    res.send(response);
  } else {
    res.send(`Role ${timesheetRole} not found`);
  }
});

// TO SEE A TIMESHEET BY TASK
router.get('/task/:task', async (req, res) => {
  const timesheetTask = req.params.task.toString();
  const response = timesheet.find((elem) => elem.task.toString() === timesheetTask);
  if (response) {
    res.send(response);
  } else {
    res.send(`Task ${timesheetTask} not found`);
  }
});

// TO CREATE A NEW TIMESHEET
router.post('/create', (req, res) => {
  const {
    description, date, task, validated, employee, projectId, projectManager, role,
  } = req.body;
  const id = timesheet.reduce((prev, curr) => (prev <= curr.id ? curr.id + 1 : prev), 0);
  const timesheetData = {
    id,
    description,
    date,
    task,
    validated,
    employee,
    projectId,
    projectManager,
    role,
  };
  timesheet.push(timesheetData);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheet), (err) => {
    if (err) {
      res.send(400);
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
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimesheet), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Timesheet deleted.');
      }
    });
  }
});

module.exports = router;
