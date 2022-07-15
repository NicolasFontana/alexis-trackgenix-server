import models from '../models';

// GET ALL TASKS
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await models.Tasks.find({ isDeleted: false });
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
      if (!task) {
        return res.status(404).json({
          message: 'id not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Task by Id',
        data: task,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Missing id',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// GET TASK BY DESCRIPTION
const getTaskByDescription = async (req, res) => {
  try {
    if (req.params.description) {
      const task = await models.Tasks.find({
        description: req.params.description,
      });
      if (task.length <= 0) {
        return res.status(404).json({
          message: 'Task not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Task ${req.params.description} found.`,
        data: task,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Please enter a description',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

// CREATE A TASK
const createTask = async (req, res) => {
  try {
    const task = new models.Tasks({
      taskName: req.body.taskName,
      startDate: req.body.startDate,
      workedHours: req.body.workedHours,
      description: req.body.description,
      status: req.body.status,
      isDeleted: false,
    });

    const result = await task.save();

    return res.status(201).json({
      message: 'Task created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
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
          message: 'Task not found',
          data: {},
          error: true,
        });
      }
      return res.status(200).json({
        message: 'The task has been updated successfully',
        data: taskToUpdate,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'You must specify an id',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
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
        message: 'Missing id',
        data: undefined,
        error: true,
      });
    }
    const result = await models.Tasks.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Task not found',
        data: undefined,
        error: true,
      });
    }
    return res
      .json({
        message: 'Task successfully deleted',
        data: result,
        error: false,
      })
      .status(204);
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: {},
      error: true,
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
