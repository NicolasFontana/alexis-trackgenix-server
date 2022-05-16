import Task from '../models/Tasks';

// GET ALL TASKS
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
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
      const task = await Task.findById(req.params.id);
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

// CREATE A TASK
const createTask = async (req, res) => {
  try {
    const task = new Task({
      description: {
        type: String,
        required: true,
      },
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
    if (!req.params) {
      return res.status(400).json({
        msg: 'Missing id parameter',
      });
    }

    const result = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'Task not found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
      error: error.details[0].message,
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
    const result = await Task.findByIdAndDelete(req.params.id);
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
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
