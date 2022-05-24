import models from '../models';

// get all employees
const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await models.Employees.find({})
      .populate('projects', {
        name: 1,
        description: 1,
        startDate: 1,
        endDate: 1,
        clientName: 1,
        active: 1,
      })
      .populate('timeSheets', {
        projectId: 1,
        Task: 1,
        approved: 1,
      });
    res.status(200).json({
      message: 'All employees',
      data: allEmployees,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      data: undefined,
      error: true,
    });
  }
};

// get employee by id **UPDATED BY MARTIN P.

const getEmployeeById = async (req, res) => {
  try {
    const singleEmployee = await models.Employees.findById(req.params.id)
      .populate('projects', {
        name: 1,
        description: 1,
        startDate: 1,
        endDate: 1,
        clientName: 1,
        active: 1,
      })
      .populate('timeSheets', {
        projectId: 1,
        Task: 1,
        approved: 1,
      });
    if (singleEmployee) {
      return res.status(200).json({
        msg: `Employee with id ${req.params.id}`,
        data: singleEmployee,
        error: false,
      });
    }
    return res.status(404).json({
      msg: 'missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: [error, { id: req.params.id }],
      data: {},
      error: true,
    });
  }
};

// get employee by firstName **UPDATED BY MARTIN P.
const getEmployeeByFirstName = async (req, res) => {
  try {
    const Employees = await models.Employees.find({ firstName: req.params.firstName })
      .populate('projects', {
        name: 1,
        description: 1,
        startDate: 1,
        endDate: 1,
        clientName: 1,
        active: 1,
      })
      .populate('timeSheets', {
        projectId: 1,
        Task: 1,
        approved: 1,
      });
    if (Employees.length !== 0) {
      return res.status(200).json({
        msg: `Employee with firstName ${req.params.firstName}`,
        data: Employees,
        error: false,
      });
    }
    return res.status(404).json({
      msg: 'missing firstName parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: [error, { id: req.params.id }],
      data: {},
      error: true,
    });
  }
};

// get employee by lastName **UPDATED BY MARTIN P.
const getEmployeeByLastName = async (req, res) => {
  try {
    const lastNameParam = req.params.lastName;
    const Employees = await models.Employees.find({ lastName: req.params.lastName })
      .populate('projects', {
        name: 1,
        description: 1,
        startDate: 1,
        endDate: 1,
        clientName: 1,
        active: 1,
      })
      .populate('timeSheets', {
        projectId: 1,
        taskId: 1,
        approved: 1,
      });
    if (Employees.length !== 0) {
      return res.status(200).json({
        msg: `Employee with lastName ${lastNameParam}`,
        data: Employees,
        error: false,
      });
    }
    return res.status(404).json({
      msg: 'missing lastName parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: [error, { id: req.params.id }],
      data: {},
      error: true,
    });
  }
};

// get employee by activity **UPDATED BY MARTIN P.
const getEmployeeByActivity = async (req, res) => {
  try {
    const activeParam = req.params.active;
    const Employees = await models.Employees.find({ active: activeParam })
      .populate('projects', {
        name: 1,
        description: 1,
        startDate: 1,
        endDate: 1,
        clientName: 1,
        active: 1,
      })
      .populate('timeSheets', {
        projectId: 1,
        taskId: 1,
        approved: 1,
      });
    if (Employees.length <= 0) {
      res.status(404).json({
        msg: 'missing active parameter',
        data: undefined,
        error: true,
      });
    } else {
      res.status(200).json({
        msg: `Employee with status ${activeParam}`,
        data: Employees,
        error: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: err,
      data: undefined,
      error: true,
    });
  }
};

// create employee **UPDATED BY MARTIN P.
const createEmployee = async (req, res) => {
  try {
    const employee = new models.Employees({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      data: undefined,
      error: true,
    });
  }
};

/// update employee
const updateEmployee = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }

    const result = await models.Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).populate('projects', {
      name: 1,
      description: 1,
      startDate: 1,
      endDate: 1,
      clientName: 1,
      active: 1,
    })
      .populate('timeSheets', {
        projectId: 1,
        taskId: 1,
        approved: 1,
      });
    if (!result) {
      return res.status(404).json({
        message: 'The employee has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee updated',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      data: undefined,
      err: true,
    });
  }
};

// delete employee
const deleteEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await models.Employees.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).json({
        message: 'The employee has not been found',
        data: undefined,
        error: true,
      });
    }
    res.json({
      message: 'The employee has been succesfully deleted',
      data: result,
      error: false,
    }).status(204);
  } catch (err) {
    res.status(400).json({
      message: err,
      data: undefined,
      err: true,
    });
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  getEmployeeByFirstName,
  getEmployeeByLastName,
  getEmployeeByActivity,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
