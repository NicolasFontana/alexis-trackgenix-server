import models from '../models';
import Firebase from '../helper/firebase';

const getAllAdmins = async (req, res) => {
  try {
    if (req.query.id) {
      const admin = await models.Admins.find({ _id: req.query.id, isDeleted: false });
      return res.status(200).json({
        message: 'Admin found',
        data: admin,
        error: false,
      });
    }
    const allAdmins = await models.Admins.find({ isDeleted: false });
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

const getDeletedAdmins = async (req, res) => {
  try {
    const deletedAdmins = await models.Admins.find({ isDeleted: true });
    return res.status(200).json({
      message: 'Admins found',
      data: deletedAdmins,
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
      isDeleted: false,
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

const deleteAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'You must specify an id',
        data: undefined,
        error: true,
      });
    }
    const admin = await models.Admins.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true },
    );
    if (!admin) {
      return res.status(404).json({
        message: `Admin with id ${req.params.id} not found`,
        data: undefined,
        error: true,
      });
    }
    if (admin.firebaseUid) {
      await Firebase.auth().updateUser(admin.firebaseUid, {
        disabled: true,
      });
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

const restoreAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'You must specify an id',
        data: undefined,
        error: true,
      });
    }
    const admin = await models.Admins.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true },
    );
    if (!admin) {
      return res.status(404).json({
        message: `Admin with id ${req.params.id} not found`,
        data: undefined,
        error: true,
      });
    }
    if (admin.firebaseUid) {
      await Firebase.auth().updateUser(admin.firebaseUid, {
        disabled: false,
      });
    }
    return res
      .json({
        message: `Admin with id ${req.params.id} restored`,
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

const removeAdmin = async (req, res) => {
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

        message: `Admin with id ${req.params.id} removed`,
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

export default {
  getAllAdmins,
  getDeletedAdmins,
  createAdmin,
  deleteAdmin,
  updateAdmin,
  restoreAdmin,
  removeAdmin,
};
