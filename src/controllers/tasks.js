import models from '../models';

const getAllTasks = async (req, res) => {
  try {
    if (req.query.id) {
      const task = await models.Tasks.find({ _id: req.query.id, isDeleted: false });
      return res.status(200).json({
        message: 'Task found',
        data: task,
        error: false,
      });
    }
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

const getDeletedTasks = async (req, res) => {
  try {
    const deletedTasks = await models.Tasks.find({ isDeleted: true });
    return res.status(200).json({
      message: 'Deleted tasks',
      data: deletedTasks,
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
  getDeletedTasks,
  createTask,
  updateTask,
  deleteTask,
};
