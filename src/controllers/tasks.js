import models from '../models';

// GET ALL TASKS
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await models.Tasks.find({});
    return res.status(200).json({
      message: 'All tasks',
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
      const task = await models.Tasks.findById(req.params.id);
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

// GET TASK BY DESCRIPTION
const getTaskByDescription = async (req, res) => {
  try {
    if (req.params.description) {
      const task = await models.Tasks.find({ description: req.params.description });
      return res.status(200).json({
        message: `Task ${req.params.description} found.`,
        data: task,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Please enter a name',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

// CREATE A TASK
const createTask = async (req, res) => {
  try {
    const task = new models.Tasks({
      date: req.body.date,
      workedHours: req.body.workedHours,
      description: req.body.description,
    });

    const result = await task.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
      data: error,
      error: true,
    });
  }
};

// UPDATE A TASK
const updateTask = async (req, res) => {
  try {
    if (req.params.id) {
      const taskToUpdate = await models.Tasks.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!taskToUpdate) {
        return res.status(404).json({
          msg: 'Missing id parameter',
          data: {},
          error: true,
        });
      }
      return res.status(200).json({
        message: `Task ${req.params.id} updated`,
        data: taskToUpdate,
        error: true,
      });
    }
    return res.status(400).json({
      message: 'You must specify an id',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'An error has ocurred',
      data: {},
      error: true,
    });
  }
};

// DELETE A TASK
const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'Missing id',
      });
    }
    const result = await models.Tasks.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'Task not found',
      });
    }

    return res.status(200).json({
      msg: 'Task succesfully deleted',
    });
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
    });
  }
};

export default {
  getAllTasks,
  getTaskByDescription,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
