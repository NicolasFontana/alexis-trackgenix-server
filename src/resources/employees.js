const express = require('express');
// const fs = require('fs');
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

// router.delete('/delete/:id', (req, res) => {
//   const idEmployee = Number(req.params.id);
//   const selectedEmployee = employees.find((employee) => employee.id === idEmployee);
// });
module.exports = router;
// shift alt flechita
// sobre la seleccion ctrl d
