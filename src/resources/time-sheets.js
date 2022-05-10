// IMPORT & REQUIRES
const express = require('express');
const fs = require('fs');

const timesheetRouter = express.Router();

// DATA IN JSON
const timesheets = require('../data/time-sheets.json');

timesheetRouter.get('/', (req, res) => {
  res.send(timesheets);
});

// TO GET A TIMESHEET BY ID
timesheetRouter.get('/id=:id', async (req, res) => {
  const timesheetID = req.params.id.toString();
  const response = timesheets.find((timesheet) => timesheet.id.toString() === timesheetID);
  if (response) {
    res.send(response);
  } else {
    res.send(`Timesheet ${timesheetID} not found`);
  }
});

// TO GET A TIMESHEET BY ROLE
timesheetRouter.get('/role=:role', async (req, res) => {
  const timesheetRole = req.body.role.toString();
  const response = timesheets.filter((timesheet) => timesheet.role.toString() === timesheetRole);
  if (response) {
    res.send(response);
  } else {
    res.send(`Role ${timesheetRole} not found`);
  }
});

// TO GET A TIMESHEET BY TASK
timesheetRouter.get('/task=:task', async (req, res) => {
  const timesheetTask = req.params.task.toString();
  const response = timesheets.find((timesheet) => timesheet.task.toString() === timesheetTask);
  if (response) {
    res.send(response);
  } else {
    res.send(`Task ${timesheetTask} not found`);
  }
});

// TO CREATE A NEW TIMESHEET
timesheetRouter.post('/create', (req, res) => {
  const {
    description, date, task, validated, employee, projectId, projectManager, role,
  } = req.body;
  const id = timesheets.reduce((prev, curr) => (prev <= curr.id ? curr.id + 1 : prev), 0);
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
  timesheets.push(timesheetData);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send('New Timesheet created.').json(timesheetData);
    }
  });
});

// TO DELETE A TIMESHEET BY ID
timesheetRouter.delete('/delete=:id', (req, res) => {
  const timesheetID = req.params.id.toString();
  const filteredTimesheet = timesheets.filter((tsheet) => tsheet.id.toString() !== timesheetID);
  if (timesheets.length === filteredTimesheet.length) {
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

module.exports = timesheetRouter;
