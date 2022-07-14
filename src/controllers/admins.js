import models from '../models';
import Firebase from '../helper/firebase';

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await models.Admins.find({});
    return res.status(200).json({
      message: 'Admins found',
      data: allAdmins,
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

// Get single admin by id
const getAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await models.Admins.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({
          message: `Admin with id ${req.params.id} not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Admin with id ${req.params.id} found`,
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'You must specify an id',
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

// Get admins by firstName
const getAdminByFirstName = async (req, res) => {
  try {
    if (req.params.firstName) {
      const firstName = req.params.firstName.toLowerCase();
      const admin = await models.Admins.find({ firstName });
      if (admin.length <= 0) {
        return res.status(404).json({
          message: `Admin with first name ${req.params.firstName} not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admins found',
        data: admin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'You must specify a first name',
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

// Get admins by lastName
const getAdminByLastName = async (req, res) => {
  try {
    if (req.params.lastName) {
      const lastName = req.params.lastName.toLowerCase();
      const admin = await models.Admins.find({ lastName });
      if (admin.length <= 0) {
        return res.status(404).json({
          message: `Admin with last name ${req.params.lastName} not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admins found',
        data: admin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'You must specify a last name',
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

// Get admins by email
const getAdminByEmail = async (req, res) => {
  try {
    if (req.params.email) {
      const admin = await models.Admins.find({ email: req.params.email });
      if (admin.length <= 0) {
        return res.status(404).json({
          message: `Admin with email ${req.params.email} not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admin found',
        data: admin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'You must specify an email',
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

// Get admins by active status
const getAdminByStatus = async (req, res) => {
  try {
    if (req.params.active) {
      const adminsList = await models.Admins.find({
        active: req.params.active,
      });
      if (adminsList.length <= 0) {
        return res.status(404).json({
          message: `Admin with the active of ${req.params.active} not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admins found',
        data: adminsList,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'You must specify a status',
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

// Create admin
const createAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseEmployee = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    firebaseUid = newFirebaseEmployee.uid;
    await Firebase.auth().setCustomUserClaims(newFirebaseEmployee.uid, { role: 'ADMIN' });

    const newAdmin = new models.Admins({
      firstName: req.body.firstName.toLowerCase(),
      lastName: req.body.lastName.toLowerCase(),
      email: req.body.email,
      firebaseUid,
      active: req.body.active,
    });
    const result = await newAdmin.save();
    return res.status(201).json({
      message: 'Admin created',
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

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'You must specify an id',
        data: undefined,
        error: true,
      });
    }
    const admin = await models.Admins.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({
        message: `Admin with id ${req.params.id} not found`,
        data: undefined,
        error: true,
      });
    }
    if (admin.firebaseUid) {
      await Firebase.auth().deleteUser(admin.firebaseUid);
    }
    return res
      .json({
        message: `Admin with id ${req.params.id} deleted`,
        data: admin,
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

// Update admin
const updateAdmin = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await models.Admins.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!admin) {
        return res.status(404).json({
          message: `Admin with this id ${req.params.id} not found`,
          data: undefined,
          error: true,
        });
      }
      if (admin.firebaseUid) {
        Firebase.auth().updateUser(
          admin.firebaseUid,
          { email: req.body.email, password: req.body.password },
        );
      }
      return res.status(200).json({
        message: 'The admin has been updated successfully',
        data: admin,
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
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  getAdminByFirstName,
  getAdminByLastName,
  getAdminByEmail,
  getAdminByStatus,
  createAdmin,
  deleteAdmin,
  updateAdmin,
};
