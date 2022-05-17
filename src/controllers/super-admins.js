import models from '../models';

// GET ALL SUPERADMINS
const getAllSuperadmins = async (req, res) => {
  try {
    const allSuperadmins = await models.SuperAdmin.find({});
    return res.status(200).json({
      message: 'All Superadmins',
      data: allSuperadmins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: [error, { id: req.params.id }],
      data: {},
      error: true,
    });
  }
};

// CREATE A NEW SUPERADMIN
const createSuperadmin = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password, active,
    } = req.body;
    const newSuperadmin = new models.SuperAdmin({
      firstName,
      lastName,
      email,
      password,
      active,
    });
    const result = await newSuperadmin.save();
    return res.status(201).json({
      message: 'Superadmin created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: [error, { id: req.params.id }],
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
    const stringQuery = await models.SuperAdmin.find({
      firstName: { $regex: new RegExp(firstName || '', 'i') },
      lastName: { $regex: new RegExp(lastName || '', 'i') },
      email: { $regex: new RegExp(email || '', 'i') },
    });
    const filtered = stringQuery.filter((elem) => ((active === true || active === false)
      ? (elem.active === active) : true));
    return res.status(200).json({
      message: 'Superadmins filtered',
      data: filtered,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: [error, { id: req.params.id }],
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
        message: `Superadmin with id: ${id}`,
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
      message: [error, { id: req.params.id }],
      data: {},
      error: true,
    });
  }
};

// UPDATE AN SPECIFIC SUPERADMIN BY ID
const updateSuperadmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        message: 'You must specify an id',
        data: {},
        error: true,
      });
    }
    const { id } = req.params;
    const updatedAdmin = await models.SuperAdmin.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({
      message: 'Super-Admin updated',
      data: updatedAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: [error, `Superadmin with id:${req.params.id} not found`],
      data: {},
      error: true,
    });
  }
};

// DELETE A SPECIFIC SUPERADMIN BY ID
const deleteSuperadminById = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        message: 'You must specify an id',
        data: {},
        error: true,
      });
    }

    const deletedDoc = await models.SuperAdmin.findByIdAndDelete(req.params.id);

    if (!deletedDoc) {
      return res.status(404).json({
        message: `There is no Superadmin with _id:${req.params.id}`,
        data: {},
        error: true,
      });
    }

    return res.json({
      message: 'User eliminated',
      data: deletedDoc,
      error: false,
    }).status(204);
  } catch (error) {
    return res.status(400).json({
      message: [error, { id: req.params.id }],
      data: {},
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
