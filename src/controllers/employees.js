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
        taskId: 1,
        approved: 1,
      });
    res.status(200).json({
      message: 'All employees',
      data: allEmployees,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// get employee by id
const getEmployeeById = async (req, res) => {
  try {
    if (req.params.id) {
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
      res.status(200).json({
        message: `Employee with id ${req.params.id}`,
        data: singleEmployee,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// get employee by firstName
const getEmployeeByFirstName = async (req, res) => {
  try {
    if (req.params.firstName) {
      const firstNameParam = req.params.firstName;
      const Employees = await models.Employees.find({ firstName: firstNameParam })
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
      res.status(200).json({
        message: `Employee with firstName ${firstNameParam}`,
        data: Employees,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'missing firstName parameter',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

// get employee by lastName
const getEmployeeByLastName = async (req, res) => {
  try {
    if (req.params.lastName) {
      const lastNameParam = req.params.lastName;
      const Employees = await models.Employees.find({ lastName: lastNameParam })
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
      res.status(200).json({
        message: `Employee with lastName ${lastNameParam}`,
        data: Employees,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'missing lastName parameter',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

// get employee by activity
const getEmployeeByActivity = async (req, res) => {
  try {
    if (req.params.active) {
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
      res.status(200).json({
        message: `Employee with status ${activeParam}`,
        data: Employees,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'missing active parameter',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

// create employee
const createEmployee = async (req, res) => {
  try {
    const employee = new models.Employees({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
      projects: req.body.projects,
      timesheets: req.body.timesheets,
    });
    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// update employee
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
  } catch (error) {
    return res.status(400).json({
      message: error.message,
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
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Employee with id ${req.params.id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
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
