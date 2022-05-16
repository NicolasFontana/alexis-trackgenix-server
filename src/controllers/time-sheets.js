import timeSheetModel from '../models/Time-sheets';

// GET ALL

const getAllTimesheets = async (req, res) => {
  try {
    const allTimesheets = await timeSheetModel.find({});
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
// CREATE TIMESHEET
const createTimesheet = async (req, res) => {
  try {
    // eslint-disable-next-line new-cap
    const timesheet = new timeSheetModel({
      description: req.body.description,
      date: req.body.date,
      taskId: req.body.taskId,
      validated: req.body.validated,
      employeeId: req.body.employeeId,
      projectId: req.body.projectId,
      projectManagerId: req.body.projectManagerId,
      role: req.body.role,
    });
    const result = await timesheet.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
      data: error,
      error: true,
    });
  }
};
// DELETE TIMSHEET
const deleteTimesheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'An error has ocurred',
        data: undefined,
        error: true,
      });
    }
    const result = await timeSheetModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: `There is no timesheet with this Id ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: `The ${req.params.id} timesheet has been susccesfully deleted`,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllTimesheets,
  createTimesheet,
  deleteTimesheet,
};
