const express = require('express');

const tasks = require('../data/tasks.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const taskID = req.params.id;
  const task = tasks.find((t) => t.id === taskID);
  if (task) {
    res.send(task);
  } else {
    res.send('Task not found');
  }
});

router.get('/', (req, res) => {
  const taskDesc = req.query.description;
  if (!taskDesc) {
    res.send(tasks);
  } else {
    const filteredTask = tasks.filter((t) => t.description.includes(taskDesc));
    if (filteredTask.length > 0) {
      res.send(filteredTask);
    } else {
      res.send(`There are not description that includes ${taskDesc}`);
    }
  }
});

router.put('/:id', (req, res) => {
  const taskID = req.params.id;
  const task = tasks.find((t) => t.id === taskID);
  if (task) {
    const taskUpdate = req.body;
    task.description = taskUpdate.description ? taskUpdate.description : task.description;
    res.send({ msg: 'Task updated', task });
  } else {
    res.send('Task not found');
  }
});

module.exports = router;
