// IMPORTS AND REQUIRES
const express = require('express');

const router = express.Router();
const fs = require('fs');

// JSON DATA
const timesheet = require('../data/time-sheets.json');

// GET TIME SHEETS BETWEEN DATES
router.get('/date', async (req, res) => {
  const { initDate, endDate } = req.body;
  const initialDate = new Date(initDate);
  const finalDate = new Date(endDate);
  const beforeDate = timesheet.filter((elem) => (new Date(elem.date).getTime() <= finalDate));
  const afterDate = timesheet.filter((elem) => (new Date(elem.date).getTime() >= initialDate));
  const response = beforeDate.filter((elem) => afterDate.includes(elem));
  res.status(200).json(response ?? { success: false, msg: 'Id was not found' });
});

// GET TIME SHEETS ACCORDING TO VALIDATION
// req could be 0 -> false or 1 -> true
router.get('/validation/:valid', async (req, res) => {
  const { valid } = req.params;
  const isValid = (valid === '1' || valid === '0' ? valid === '1' : 'Invalid input');
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

// GET TIME SHEETS FROM A SPECIFIC EMPLOYEE
router.get('/employee/:id', async (req, res) => {
  const { id } = req.params;
  const response = await timesheet.filter((elem) => elem.employee.toString() === id.toString());
  if (response.length === 0) {
    res.status(400).json({ success: false, msg: 'No such employee' });
  } else {
    res.status(200).json(response);
  }
});

// UPDATE A TIME SHEET
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const {
    description, date, task, validated, employee, projectId, projectManager, role,
  } = req.body;
  const copyOfTS = await timesheet.find((elem) => elem.id.toString() === id.toString());
  const restOfTimeSheets = await timesheet.filter((elem) => elem.id.toString() !== id.toString());
  const updatedTS = {
    id: Number(id),
    description: (description || copyOfTS.description),
    date: (date || copyOfTS.date),
    task: (task || copyOfTS.task),
    validated: (validated || copyOfTS.validated),
    employee: (employee || copyOfTS.employee),
    projectId: (projectId || copyOfTS.projectId),
    projectManager: (projectManager || copyOfTS.projectManager),
    role: (role || copyOfTS.role),
  };
  restOfTimeSheets.push(updatedTS);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(restOfTimeSheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Timesheet updated');
    }
  });
});

module.exports = router;
