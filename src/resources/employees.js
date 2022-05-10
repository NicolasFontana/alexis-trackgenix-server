const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();
// GET ALL
router.get('/', (req, res) => res.send(employees));
// GET BY ID
router.get('/id=:id', (req, res) => {
  const idEmployee = Number(req.params.id);
  res.send(employees.find((employee) => employee.id === idEmployee) || 'Null');
});
// GET BY Name
router.get('/firstName=:name', (req, res) => {
  const nameEmployee = String(req.params.name);
  res.send(employees.filter((employee) => employee.firstName.toLowerCase()
  === nameEmployee.toLowerCase()));
});
// GET BY LastName
router.get('/lastName=:lastName', (req, res) => {
  const lastNameEmployee = String(req.params.lastName);
  res.send(employees.filter((employee) => employee.lastName.toLowerCase()
  === lastNameEmployee.toLowerCase()));
});
// GET BY Email
router.get('/email=:email', (req, res) => {
  const emailEmployee = String(req.params.email);
  res.send(employees.filter((employee) => employee.email === emailEmployee));
});
// GET BY Active
router.get('/active=:active', (req, res) => {
  const activeEmployee = Boolean(req.params.active);
  res.send(employees.filter((employee) => employee.active === activeEmployee));
});
// DELETE Employee
router.delete('/delete=:id', (req, res) => {
  const idEmployee = Number(req.params.id);
  const withoutEmployee = employees.filter((employee) => employee.id !== idEmployee);
  if (withoutEmployee.length === employees.length) {
    res.status(400).json({ msg: 'Please fill in a valid id' });
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(withoutEmployee), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee deleted');
      }
    });
  }
});
// CREATE Employee
router.post('/', (req, res) => {
  const initialValue = 0;
  const ids = employees.reduce(
    (previousValue, currentValue) => (previousValue <= currentValue.id ? currentValue.id + 1
      : previousValue),
    initialValue,
  );
  const newEmployee = {
    id: ids,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    active: true,
  };
  if (!(newEmployee.firstName && newEmployee.lastName && newEmployee.email
 && newEmployee.phone)) {
    res.status(400).json({ msg: 'Please fill in firstName, lastName, email and phone' });
  } else {
    employees.push(newEmployee);
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('New employee added');
      }
    });
  }
});
// UPDATE Employee
router.put('/update=:id', (req, res) => {
  const idEmployee = Number(req.params.id);
  const employeeToUpdate = employees.find((employee) => employee.id === idEmployee);
  const withoutOldEmployee = employees.filter((employee) => employee.id !== idEmployee);
  const newEmployee = {
    id: idEmployee,
    firstName: (req.body.firstName || employeeToUpdate.firstName),
    lastName: (req.body.lastName || employeeToUpdate.lastName),
    phone: (req.body.phone || employeeToUpdate.phone),
    email: (req.body.email || employeeToUpdate.email),
    active: (req.body.active || employeeToUpdate.active),
  };
  if (!(employeeToUpdate)) {
    res.status(400).json({ msg: 'Please fill in a valid id' });
  } else {
    withoutOldEmployee.push(newEmployee);
    fs.writeFile('src/data/employees.json', JSON.stringify(withoutOldEmployee), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee updated');
      }
    });
  }
});
module.exports = router;
