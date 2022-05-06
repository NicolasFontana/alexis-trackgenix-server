const express = require('express');

const tasks = require('../data/tasks.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(tasks);
});

router.get('/:id', (req, res) => {
  const taskID = req.params.id;
  const task = tasks.find((t) => t.id === taskID);
  if (task) {
    res.send(task);
  } else {
    res.send('Task not found');
  }
});

module.exports = router;
