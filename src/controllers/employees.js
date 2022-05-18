import models from '../models';

// get all employees
const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await models.Employees.find({});
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

// get employee by id
const getEmployeeById = async (req, res) => {
  try {
    if (req.params.id) {
      const singleEmployee = await models.Employees.findById(req.params.id);
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
  } catch (err) {
    res.status(400).json({
      message: err.message,
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
      const Employees = await models.Employees.find({ firstName: firstNameParam });
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
  } catch (err) {
    res.status(400).json({
      message: err,
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
      const Employees = await models.Employees.find({ lastName: lastNameParam });
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
  } catch (err) {
    res.status(400).json({
      message: err,
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
      const Employees = await models.Employees.find({ active: activeParam });
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
  } catch (err) {
    res.status(400).json({
      message: err,
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

// update employee
const updateEmployee = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }

    const result = await models.Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      res.status(404).json({
        message: 'The employee has not been found',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Employee updated',
      data: result,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: 'An error has ocurred',
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
