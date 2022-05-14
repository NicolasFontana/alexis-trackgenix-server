import models from '../models/Super-admins';

const getAllSuperadmins = async (req, res) => {
  try {
    const allSuperadmins = await models.SuperAdmin.find({});
    res.status(200).json({
      message: 'All Super-Admins',
      data: allSuperadmins,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

const createSuperadmin = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;
    const newSuperadmin = new models.SuperAdmin({
      firstName, lastName, email, password,
    });
    const result = await newSuperadmin.save();
    res.status(201).json({
      message: 'Super-Admin created',
      data: result,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

const getSuperadminById = async (req, res) => {
  try {
    if (!req.params) {
      res.status(404).json({
        message: 'You must specify an id',
        data: {},
        error: true,
      });
    }
    const { id } = req.params;
    const superadminByID = await models.SuperAdmin.find({ _id: id });
    res.status(200).json({
      message: `Super-Admin with id: ${id}`,
      data: superadminByID,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

const updateSuperadmin = async (req, res) => {
  try {
    if (!req.params) {
      req.status(404).json({
        message: 'You must specify an id',
        data: {},
        error: true,
      });
    }
    const { id } = req.params;
    const {
      firstName, lastName, email, password,
    } = req.body;
    const updatedAdmin = await models.SuperAdmin.findByIdAndUpdate(id, {
      firstName, lastName, email, password,
    });
    res.status(200).json({
      message: 'Super-Admin created',
      data: updatedAdmin,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

const deleteSuperadminById = async (req, res) => {
  try {
    if (!req.params) {
      req.status(404).json({
        message: 'You must specify an id',
        data: {},
        error: true,
      });
    }
    const { id } = req.params;
    const deletedUser = await models.SuperAdmin.deleteById(id);
    req.status(204).json({
      message: `User with id:${id} eliminated`,
      data: deletedUser,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

export default {
  getAllSuperadmins,
  createSuperadmin,
  getSuperadminById,
  updateSuperadmin,
  deleteSuperadminById,
};
