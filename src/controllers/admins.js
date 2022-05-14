import AdminModel from '../models/Admins';

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await AdminModel.find({});
    return res.status(200).json({
      message: 'All admins',
      data: allAdmins,
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

// Get single admin by id
const getAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await AdminModel.findById(req.params.id);
      return res.status(200).json({
        message: 'Admin by id',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with this id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

// Get admins by firstName
const getAdminByFirstName = async (req, res) => {
  try {
    if (req.params.firstName) {
      const admin = await AdminModel.findOne(req.params.firstName);
      return res.status(200).json({
        message: 'Admin by first name',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with this first name ${req.params.firstName} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

// Get admins by lastName
const getAdminByLastName = async (req, res) => {
  try {
    if (req.params.lastName) {
      const admin = await AdminModel.findOne(req.params.lastName);
      return res.status(200).json({
        message: 'Admin by last name',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with this last name ${req.params.lastName} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

// Get admins by active status
const getAdminByStatus = async (req, res) => {
  try {
    if (req.params.active) {
      const adminsList = await AdminModel.findOne(req.params.active);
      return res.status(200).json({
        message: 'Admins by active status',
        data: adminsList,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with the active of ${req.params.active} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

// Create admin
const createAdmin = async (req, res) => {
  try {
    const newAdmin = new AdminModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: true,
    });
    const result = await newAdmin.save();
    return res.status(201).json({
      message: 'Admin created',
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

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await AdminModel.findByIdAndDelete(req.params.id);
      return res.status(204).json({
        message: `Admin with this id ${req.params.id} deleted`,
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with this id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

// Update admin
const updateAdmin = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await AdminModel.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json({
        message: 'Admin updated',
        data: admin,
        error: true,
      });
    }
    return res.status(404).json({
      message: `Admin with this id ${req.params.id} not found`,
      data: undefined,
      error: true,
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
  getAllAdmins,
  getAdminById,
  getAdminByFirstName,
  getAdminByLastName,
  getAdminByStatus,
  createAdmin,
  deleteAdmin,
  updateAdmin,
};
