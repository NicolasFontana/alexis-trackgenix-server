import models from '../models';

// GET ALL
const getAllTimesheets = async (req, res) => {
  try {
    const allTimesheets = await models.TimeSheet.find({ isDeleted: false })
      .populate('projectId', { name: 1 })
      .populate('Task.taskId', {
        taskName: 1,
        startDate: 1,
        workedHours: 1,
        description: 1,
        status: 1,
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
// GET BY ID
const getByIdTimesheets = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide an ID',
        data: {},
        error: true,
      });
    }
    const { id } = req.params;
    const timesheetsById = await models.TimeSheet.findById(id);
    if (timesheetsById) {
      return res.status(200).json({
        message: 'The time sheets with this criteria are:',
        data: timesheetsById,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Time Sheet not found',
      data: {},
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
// GET BY ROLE
const getByRoleTimesheets = async (req, res) => {
  try {
    if (!req.params || !['QA', 'DEV', 'TL', 'PM'].includes(req.params.role)) {
      return res.status(400).json({
        message: 'Please provide a valid role',
        data: {},
        error: true,
      });
    }
    const timesheetsByRole = await models.TimeSheet.find({
      role: req.params.role,
    });
    if (timesheetsByRole.length !== 0) {
      return res.status(200).json({
        message: `The time sheets with role ${req.params.role} are:`,
        data: timesheetsByRole,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Time Sheet not found with rol ${req.params.role}`,
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error[0].message.message,
      data: {},
      error: true,
    });
  }
};

// GET A TIMESHEET BY TASK
const getByTaskTimesheets = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide a task',
        data: {},
        error: true,
      });
    }
    const timesheetsByTask = await models.TimeSheet.find({
      taskId: req.params.taskId,
    });
    if (timesheetsByTask.length !== 0) {
      return res.status(200).json({
        message: `The time sheets with task ID ${req.params.taskId} are:`,
        data: timesheetsByTask,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Time Sheet not found',
      data: {},
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

// GET TIME SHEETS BY VALIDATED
const getByValidatedTimesheets = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide a Validated ID',
        data: {},
        error: true,
      });
    }
    const timesheetsByValidated = await models.TimeSheet.find({
      validated: req.params.validated,
    });
    if (timesheetsByValidated.length !== 0) {
      return res.status(200).json({
        message: 'Time-sheet fetched',
        data: timesheetsByValidated,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Time Sheet not found',
      data: {},
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

// GET TIME SHEETS BY PROJECT
const getByProjecTimesheets = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide a Project ID',
        data: {},
        error: true,
      });
    }
    const timesheetsByProject = await models.TimeSheet.find({
      projectId: req.params.projectId,
    });
    if (timesheetsByProject.length !== 0) {
      return res.status(200).json({
        message: 'Time-sheet fetched',
        data: timesheetsByProject,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Time Sheet not found',
      data: {},
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
// GET TIMESHEETS BY EMPLOYEE
const getByEmployeeTimesheets = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide a Employee ID',
        data: {},
        error: true,
      });
    }
    const timesheetsByEmployee = await models.TimeSheet.find({
      employeeId: req.params.employeeId,
    });
    if (timesheetsByEmployee.length !== 0) {
      return res.status(200).json({
        message: 'Time-sheet fetched',
        data: timesheetsByEmployee,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Time Sheet not found',
      data: {},
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

// GET TIMESHEETS BY PROJECT MANAGER
const getByPMTimesheets = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide a Project manager ID',
        data: {},
        error: true,
      });
    }
    const timesheetsByPM = await models.TimeSheet.find({
      projectManagerId: req.params.projectManagerId,
    });
    if (timesheetsByPM.length !== 0) {
      return res.status(200).json({
        message: 'Time-sheet fetched',
        data: timesheetsByPM,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Time Sheet not found',
      data: {},
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
// GET TIMESHEETS BY PROJECT MANAGER
const getBetweenDatesTimesheets = async (req, res) => {
  try {
    if (!req.query.init || !req.query.final) {
      return res.status(400).json({
        message: 'Please provide init and final dates',
        data: {},
        error: true,
      });
    }
    if (req.query.init >= req.query.final) {
      return res.status(400).json({
        message: 'Please provide an init date < final date',
        data: {},
        error: true,
      });
    }
    const timesheetsBetweenDates = await models.TimeSheet.find({
      date: {
        $gte: req.query.init,
        $lte: req.query.final,
      },
    });
    if (timesheetsBetweenDates.length !== 0) {
      return res.status(200).json({
        message: 'Time-sheet fetched',
        data: timesheetsBetweenDates,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Time Sheet not found',
      data: {},
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
// CREATE TIMESHEET
const createTimesheet = async (req, res) => {
  try {
    const timesheet = new models.TimeSheet({
      projectId: req.body.projectId,
      Task: req.body.Task,
      approved: req.body.approved,
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
// UPDATE A TIME SHEET
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
// DELETE TIMSHEET
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

export default {
  getAllTimesheets,
  getByIdTimesheets,
  getByRoleTimesheets,
  getByTaskTimesheets,
  getByValidatedTimesheets,
  getByProjecTimesheets,
  getByEmployeeTimesheets,
  getByPMTimesheets,
  getBetweenDatesTimesheets,
  updateTimeSheet,
  createTimesheet,
  deleteTimesheet,
};
