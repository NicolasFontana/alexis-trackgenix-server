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
// router.delete('/delete/:id', (req,res) => {
//   const idEmployee = Number(req.params.id);
//   const selectedEmployee = employees.find((employee) => employee.id === idEmployee);
// });
module.exports = router;
