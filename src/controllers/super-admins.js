import models from '../models';

// GET ALL SUPERADMINS
const getAllSuperadmins = async (req, res) => {
  try {
    const allSuperadmins = await models.SuperAdmin.find({});
    return res.status(200).json({
      message: 'All Super-Admins',
      data: allSuperadmins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

// CREATE A NEW SUPERADMIN
const createSuperadmin = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;
    const newSuperadmin = new models.SuperAdmin({
      firstName,
      lastName,
      email,
      password,
      active: true,
    });
    const result = await newSuperadmin.save();
    return res.status(201).json({
      message: 'Super-Admin created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

// SEARCH SUPERADMINS WITH FILTERS INCLUDED IN BODY
const getFilteredSuperadmins = async (req, res) => {
  try {
    const {
      firstName, lastName, email, active,
    } = req.body;
    const allDocs = await models.SuperAdmin.find({});
    const filtered = allDocs.filter((doc) => {
      const firstNFilter = firstName
        ? doc.firstName.toLowerCase().includes(firstName.toLowerCase()) : true;
      const lastNFilter = lastName
        ? doc.lastName.toLowerCase().includes(lastName.toLowerCase()) : true;
      const emailFilter = email
        ? doc.email.toLowerCase().includes(email.toLowerCase()) : true;
      const activeFilter = (active === true || active === false)
        ? (doc.active === active) : true;

      return (firstNFilter && lastNFilter && emailFilter && activeFilter);
    });
    return res.status(200).json({
      message: 'Superadmins filtered',
      data: filtered,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

// GET A SPECIFIC SUPERADMIN BY ID
const getSuperadminById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const superadminByID = await models.SuperAdmin.findById(id);
      return res.status(200).json({
        message: `Super-Admin with id: ${id}`,
        data: superadminByID,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'You must specify an id',
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

// UPDATE AN SPECIFIC SUPERADMIN BY ID
const updateSuperadmin = async (req, res) => {
  try {
    if (!req.params) {
      return req.status(404).json({
        message: 'You must specify an id',
        data: {},
        error: true,
      });
    }
    const { id } = req.params;
    const updatedAdmin = await models.SuperAdmin.findByIdAndUpdate(id, req.body);
    return res.status(200).json({
      message: 'Super-Admin updated',
      data: updatedAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

// DELETE A SPECIFIC SUPERADMIN BY ID
const deleteSuperadminById = async (req, res) => {
  try {
    if (!req.params) {
      return req.status(404).json({
        message: 'You must specify an id',
        data: {},
        error: true,
      });
    }
    const { id } = req.params;
    await models.SuperAdmin.findOneAndDelete({ _id: id });
    return req.status(204).json({
      message: `User with id:${id} eliminated`,
      data: {},
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: 'patata',
      error: true,
    });
  }
};

export default {
  getAllSuperadmins,
  createSuperadmin,
  getFilteredSuperadmins,
  getSuperadminById,
  updateSuperadmin,
  deleteSuperadminById,
};
