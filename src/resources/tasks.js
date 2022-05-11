// Link de js con task jason
import express from 'express';
import fs from 'fs';
import users from '../data/tasks.json';

const router = express.Router();

router.post('/add', (req, res) => {
  const initialValue = 0;
  const ids = users.reduce(
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
    users.push(taskId);
    fs.writeFile('src/data/tasks.json', JSON.stringify(users), (err) => {
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
  const filteredUsers = users.filter((user) => user.id.toString() !== taskId.toString());
  if (users.length === filteredUsers.length) {
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
