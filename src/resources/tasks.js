const express = require('express');

const tasks = require('../data/tasks.json');

const router = express.Router();

const fs = require('fs');

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
  const taskList = tasks.filter((t) => t.id !== taskID);
  if (task) {
    const taskUpdate = {
        id : taskID,
        description : (req.body.description || task.description), 
    };
    taskList.push(taskUpdate);
    fs.writeFile('src/data/tasks.json', JSON.stringify(taskList), (err) => {
        if (err) {
          res.send(err);
        } else {
            res.send({ msg: 'Task updated', taskList });
        }
      });
  } else {
    res.send('Task not found');
  }
});

module.exports = router;
