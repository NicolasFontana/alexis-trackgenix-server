import models from '../models';
import Firebase from '../helper/firebase';

const getAllEmployees = async (req, res) => {
  try {
    if (req.query.id) {
      const employee = await models.Employees.find({ _id: req.query.id, isDeleted: false }).populate('projects', {
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
          taskId: 1,
          approved: 1,
        });
      return res.status(200).json({
        message: 'Employee found',
        data: employee,
        error: false,
      });
    }
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
    return res.status(200).json({
      message: 'Employees found',
      data: allEmployees,
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

const getDeletedEmployees = async (req, res) => {
  try {
    const deletedEmployees = await models.Employees.find({ isDeleted: true }).populate('projects', {
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
    return res.status(200).json({
      message: 'Employees found',
      data: deletedEmployees,
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

const updateEmployee = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const find = await models.Employees.findById(req.params.id);
    if (find.firebaseUid === req.firebaseUid) {
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
    }
    return res.status(400).json({
      message: "You're unauthorized to edit someone else's data.",
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

const restoreEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const employee = await models.Employees.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true },
    );
    if (!employee) {
      return res.status(404).json({
        message: `Employee with id ${req.params.id} not found`,
        data: undefined,
        error: true,
      });
    }
    if (employee.firebaseUid) {
      await Firebase.auth().updateUser(employee.firebaseUid, {
        disabled: false,
      });
    }
    return res
      .json({
        message: `Employee with id ${req.params.id} restored`,
        data: employee,
        error: false,
      })
      .status(204);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const removeEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const employee = await models.Employees.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({
        message: `Employee with id ${req.params.id} not found`,

        data: undefined,
        error: true,
      });
    }
    if (employee.firebaseUid) {
      await Firebase.auth().deleteUser(employee.firebaseUid);
    }
    return res
      .json({

        message: `Employee with id ${req.params.id} deleted`,
        data: employee,
        error: false,
      })
      .status(204);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllEmployees,
  getDeletedEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  restoreEmployee,
  removeEmployee,
};
