import EmployeeModels from '../models/Employees';

// get all employees
const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await EmployeeModels.find({});
    res.status(200).json({
      message: 'All employees',
      data: allEmployees,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
};

// get employee by id
const getEmployeeById = async (req, res) => {
  try {
    if (req.params.id) {
      const singleEmployee = await EmployeeModels.findById(req.params.id);

      res.status(200).json({
        message: 'Employee',
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
      message: err,
      data: undefined,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new EmployeeModels({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      active: req.body.active,
    });
    const result = await employee.save();
    return res.status(201).json({
      message: 'New employee created',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }

    const result = await EmployeeModels.findByIdAndUpdate(
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
    res.status(200).json.json({
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

const deleteEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await EmployeeModels.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(400).json({
        message: 'The employee has not been found',
        data: undefined,
        err: true,
      });
    }
    res.status(200).json({
      message: 'The employee has been succesfully deleted',
      err: false,
    });
  } catch (err) {
    res.json({
      message: 'An error has ocurred',
      data: undefined,
      err: err.details[0].message,
    });
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
