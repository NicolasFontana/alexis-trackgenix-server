import models from '../models';

const getAllTimesheets = async (req, res) => {
  try {
    if (req.query.id) {
      const timesheet = await models.TimeSheet.find({ _id: req.query.id, isDeleted: false }).populate('projectId', { name: 1 })
        .populate('Task.taskId', {
          taskName: 1,
          startDate: 1,
          workedHours: 1,
          description: 1,
          status: 1,
        });
      return res.status(200).json({
        message: 'TimeSheet found',
        data: timesheet,
        error: false,
      });
    }
    const allTimesheets = await models.TimeSheet.find({ isDeleted: false })
      .populate('projectId', { name: 1 })
      .populate('Task.taskId', {
        taskName: 1,
        startDate: 1,
        workedHours: 1,
        description: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: 1,
      });
    return res.status(200).json({
      message: 'Time-Sheets',
      data: allTimesheets,
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

const getDeletedTimesheets = async (req, res) => {
  try {
    const deletedTimesheets = await models.TimeSheet.find({ isDeleted: true }).populate('projectId', { name: 1 })
      .populate('Task.taskId', {
        taskName: 1,
        startDate: 1,
        workedHours: 1,
        description: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: 1,
      });
    return res.status(200).json({
      message: 'Deleted Time-Sheets',
      data: deletedTimesheets,
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

const createTimesheet = async (req, res) => {
  try {
    const timesheet = new models.TimeSheet({
      projectId: req.body.projectId,
      Task: req.body.Task,
      approved: req.body.approved,
      startDate: req.body.startDate,
      isDeleted: false,
    });
    const result = await timesheet.save();
    return res.status(201).json({
      message: 'Timesheet created',
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

const updateTimeSheet = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({
        message: 'Please provide an ID',
        data: {},
        error: true,
      });
    }
    const updatedTimeSheet = await models.TimeSheet.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );
    return res.status(200).json({
      message: 'The time sheet has been updated successfully',
      data: updatedTimeSheet,
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

const deleteTimesheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'Missing Id',
        data: undefined,
        error: true,
      });
    }
    const result = await models.TimeSheet.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `There is no timesheet with this Id ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `The ${req.params.id} timesheet has been susccesfully deleted`,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const removeTimesheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'Missing Id',
        data: undefined,
        error: true,
      });
    }
    const result = await models.TimeSheet.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `There is no timesheet with this Id ${req.params.id}`,

        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `The ${req.params.id} timesheet has been susccesfully removed`,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllTimesheets,
  getDeletedTimesheets,
  updateTimeSheet,
  createTimesheet,
  deleteTimesheet,
  removeTimesheet,
};
