const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();
// GET ALL
router.get('/', (req, res) => res.send(employees));
// GET BY ID
router.get('/:id', (req, res) => {
  const idEmployee = Number(req.params.id);
  res.send(employees.find((employee) => employee.id === idEmployee) || 'Void');
});
// GET BY Name
router.get('/firstName/:name', (req, res) => {
  const nameEmployee = String(req.params.name);
  res.send(employees.filter((employee) => employee.firstName === nameEmployee));
});
// GET BY LastName
router.get('/lastName/:lastName', (req, res) => {
  const lastNameEmployee = String(req.params.lastName);
  res.send(employees.filter((employee) => employee.lastName === lastNameEmployee));
});
// GET BY Email
router.get('/email/:email', (req, res) => {
  const emailEmployee = String(req.params.email);
  res.send(employees.filter((employee) => employee.email === emailEmployee));
});
// GET BY Active
router.get('/active/:active', (req, res) => {
  const activeEmployee = Boolean(req.params.active);
  res.send(employees.filter((employee) => employee.active === activeEmployee));
});
// DELETE Employee
router.delete('/delete/:id', (req, res) => {
  const idEmployee = Number(req.params.id);
  const withoutEmployee = employees.filter((employee) => employee.id !== idEmployee);
  if (withoutEmployee === employees) {
    res.status(400);
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
// const ids = employees.map((employee) => Number(employee.id));
// router.post('/', (req, res) => {
//   const newEmployee = {
//     id: Math.max(...ids) + 1,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     phone: req.body.phone,
//     email: req.body.email,
//     active: true,
//   };
//   if (!(newEmployee.firstName && newEmployee.lastName && newEmployee.email
//  && newEmployee.phone)) {
//     res.status(400).json({ msg: 'Please fill in firstName, lastName, email and phone' });
//   }
//   fs.writeFile('src/data/employees.json', JSON.stringify(newEmployee), (err) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send('New employee added');
//     }
//   });
// });

// EDIT Employee
// router.post('/update/:id', (req, res) => {
//   const idEmployee = Number(req.params.id);
//   const employeeToUpdate = employees.find((employee) => employee.id === idEmployee);
//   const withoutEmployee = employees.filter((employee) => employee.id !== idEmployee);
//   const newEmployee = {
//     id: employeeToUpdate.id,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     phone: req.body.phone,
//     email: req.body.email,
//     active: req.body.active,
//   };
//   if (!(newEmployee.firstName && newEmployee.lastName && newEmployee.email
//     && newEmployee.phone && newEmployee.active)) {
//     res.status(400).json({ msg: 'Please fill in firstName, lastName, email and phone' });
//   }
//   fs.writeFile
//  ('src/data/employees.json', JSON.stringify(withoutEmployee.push(newEmployee)), (err) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send('Employee updated');
//     }
//   });
// });
module.exports = router;
// shift alt flechita
// sobre la seleccion ctrl d
