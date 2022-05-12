import express from 'express';

import fs from 'fs';

import tasks from '../data/tasks.json';

const tasksRouter = express.Router();

tasksRouter.get('/:id', (req, res) => {
  const taskID = req.params.id;
  const task = tasks.find((t) => t.id === taskID);
  if (task) {
    res.send(task);
  } else {
    res.send('Task not found');
  }
});

tasksRouter.get('/', (req, res) => {
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

tasksRouter.put('/:id', (req, res) => {
  const taskID = req.params.id;
  const task = tasks.find((t) => t.id === taskID);
  const taskList = tasks.filter((t) => t.id !== taskID);
  if (task) {
    const taskUpdate = {
      id: taskID,
      description: (req.body.description || task.description),
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

export default tasksRouter;
