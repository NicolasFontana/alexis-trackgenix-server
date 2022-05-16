/*
import { Router } from 'express';

import { writeFile } from 'fs';
import tasks from '../data/tasks.json';
*/
import tasksModels from '../models/Tasks';

/*
const tasksRoutes = Router();
*/
// GET ALL TASKS
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await tasksModels.find({});
    return res.status(200).json({
      message: 'All tasks.',
      data: allTasks,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

// GET TASK BY ID
const getTaskById = async (req, res) => {
  try {
    if (req.params.id) {
      const task = await tasksModels.findById(req.params.id);
      res.status(200).json(task);
    } else {
      res.status(400).json({
        message: 'id not found',
        data: undefined,
        error: true,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
};

/*
// UPDATE A TASK
updateTask.put('/:id', (req, res) => {
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

// CREATE A TASK
createTask.post('/add', (req, res) => {
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

// DELETE A TASK
deleteTask.delete('/:id', (req, res) => {
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
*/
export default {
  getAllTasks,
  getTaskById,
  /*
  createTask,
  updateTask,
  deleteTask,
  */
};
