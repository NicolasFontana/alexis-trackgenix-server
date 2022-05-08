// Link de js con task jason
const express = require('express');
const fs = require('fs');
const users = require('../data/tasks.json');
const router = express.Router();

/* Tomamos todos los ID de los users y c/u por ID 
router.get("/getAll", (req, res) => {
    res.send(users)
});

router.get("/getById/:id", (req, res) => {
   const userId = req.params.id;
   const user = users.find((user) => {
        return user.id === userId;
    });
    if (user) {
        res.send(user)
    }
    else {
        res.send("User not found")
    }
});
*/
router.post('/add', (req, res) => {
  const taskData = req.body;
  users.push(taskData);
  fs.writeFile('src/data/task.json', JSON.stringify(users), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('User created');
    }
  });
});

// Metodo de filtrado, retorna todos los ID distintos al que yo pase como parametro

router.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  const filteredUsers = users.filter((user) => user.id !== taskId);
  if (users.length === filteredUsers.length) {
    res.send('Could not delete user because it was not found');
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

module.exports = router;
