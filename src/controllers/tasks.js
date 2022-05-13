import express from 'express';
import fs from 'fs';
import tasks from '../data/tasks.json';

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

router.post('/add', (req, res) => {
  const initialValue = 0;
  const ids = tasks.reduce(
    (previousValue, currentValue) => (previousValue <= currentValue.id ? currentValue.id + 1
      : previousValue),
    initialValue,
  );
  const taskId = {
    id: ids,
    description: req.body.description,
  };
  if (!(taskId.description)) {
    res.status(400).json({ msg: 'null' });
  } else {
    tasks.push(taskId);
    fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('New User added');
      }
    });
  }
});

router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const filteredUsers = tasks.filter((user) => user.id.toString() !== taskId.toString());
  if (tasks.length === filteredUsers.length) {
    res.send('null');
  } else {
    fs.writeFile('src/data/task.json', JSON.stringify(filteredUsers), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('User deleted');
      }
    });
  }
});

export default router;
