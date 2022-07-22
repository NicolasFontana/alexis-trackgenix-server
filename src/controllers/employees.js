import models from '../models';
import Firebase from '../helper/firebase';

// get all employees
const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await models.Employees.find({ isDeleted: false })
      .populate('projects', {
        name: 1,
        description: 1,
        startDate: 1,
        endDate: 1,
        clientName: 1,
        active: 1,
        members: 1,
      })
      .populate('timeSheets', {
        projectId: 1,
        Task: 1,
        approved: 1,
      });
    res.status(200).json({
      message: 'Employees found',
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
        message: `Employee with id ${req.params.id} found`,
        data: singleEmployee,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: [error, { id: req.params.id }],
      data: {},
      error: true,
    });
  }
};

// get employee by firstName **UPDATED BY MARTIN P.
const getEmployeeByFirstName = async (req, res) => {
  try {
    const Employees = await models.Employees.find({
      firstName: req.params.firstName,
    })
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
        message: `Employee with firstName ${req.params.firstName} found`,
        data: Employees,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Missing firstName parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: [error, { id: req.params.id }],
      data: {},
      error: true,
    });
  }
};

// get employee by lastName **UPDATED BY MARTIN P.
const getEmployeeByLastName = async (req, res) => {
  try {
    const lastNameParam = req.params.lastName;
    const Employees = await models.Employees.find({
      lastName: req.params.lastName,
    })
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
        message: `Employee with lastName ${lastNameParam} found`,
        data: Employees,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Missing lastName parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: [error, { id: req.params.id }],
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
        message: 'missing active parameter',
        data: undefined,
        error: true,
      });
    } else {
      res.status(200).json({
        message: `Employee with status ${activeParam} found`,
        data: Employees,
        error: false,
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

// create employee **UPDATED BY MARTIN P.
const createEmployee = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseEmployee = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    firebaseUid = newFirebaseEmployee.uid;
    await Firebase.auth().setCustomUserClaims(newFirebaseEmployee.uid, { role: 'EMPLOYEE' });

    const employee = new models.Employees({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      firebaseUid,
      active: req.body.active,
      isDeleted: false,
      isProjectManager: req.body.isProjectManager,
      projects: req.body.projects,
      timeSheets: req.body.timeSheets,
      address: req.body.address,
      picture: req.body.picture,
      dni: req.body.dni,
      dateBirth: req.body.dateBirth,
    });
    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created',
      data: result,
      error: false,
    });
  } catch (error) {
    if (firebaseUid) {
      await Firebase.auth().deleteUser(firebaseUid);
    }
    return res.status(400).json({
      message: error.message,
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
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }

    const result = await models.Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
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
    if (!result) {
      return res.status(404).json({
        message: 'The employee has not been found',
        data: undefined,
        error: true,
      });
    }
    if (result.firebaseUid) {
      Firebase.auth().updateUser(
        result.firebaseUid,
        { email: req.body.email, password: req.body.password },
      );
    }
    return res.status(200).json({
      message: 'The employee has been updated successfully',
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

// delete employee
const deleteEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await models.Employees.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    if (result.firebaseUid) {
      await Firebase.auth().updateUser(result.firebaseUid, { disabled: true });
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
