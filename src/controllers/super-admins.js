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
      message: error,
      data: {},
      error: true,
    });
  }
};

// SEARCH SUPERADMINS BY EMAIL
const getFilteredSuperadminsByEmail = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide an email',
        data: {},
        error: true,
      });
    }
    const superAdminByEmail = await models.SuperAdmin.find({ email: req.params.email });
    if (superAdminByEmail.length !== 0) {
      return res.status(200).json({
        message: 'Superadmins filtered by email',
        data: superAdminByEmail,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Super admin not found',
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

// SEARCH SUPERADMINS BY FIRST NAME
const getFilteredSuperadminsByFirstName = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide a first name',
        data: {},
        error: true,
      });
    }
    const superAdminByFirstName = await models.SuperAdmin.find({ firstName: req.params.firstName });
    if (superAdminByFirstName.length !== 0) {
      return res.status(200).json({
        message: 'Superadmins filtered by first name',
        data: superAdminByFirstName,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Super admin not found',
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

// SEARCH SUPERADMINS BY LAST NAME
const getFilteredSuperadminsByLastName = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide a last name',
        data: {},
        error: true,
      });
    }
    const superAdminByLastName = await models.SuperAdmin.find({ lastName: req.params.lastName });
    if (superAdminByLastName.length !== 0) {
      return res.status(200).json({
        message: 'Superadmins filtered by last name',
        data: superAdminByLastName,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Super admin not found',
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

// SEARCH SUPERADMINS BY PASSWORD
const getFilteredSuperadminsByPassword = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide a password',
        data: {},
        error: true,
      });
    }
    const superAdminByPassword = await models.SuperAdmin.find({ password: req.params.password });
    if (superAdminByPassword.length !== 0) {
      return res.status(200).json({
        message: 'Superadmins filtered by password',
        data: superAdminByPassword,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Super admin not found',
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

// SEARCH SUPERADMINS BY ACTIVE
const getFilteredSuperadminsByActive = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please provide a value for active',
        data: {},
        error: true,
      });
    }
    const superAdminByActive = await models.SuperAdmin.find({ active: req.params.active });
    if (superAdminByActive.length !== 0) {
      return res.status(200).json({
        message: 'Superadmins filtered by active',
        data: superAdminByActive,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Super admin not found',
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
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
      if (superadminByID) {
        return res.status(200).json({
          message: `Superadmin with id: ${id}`,
          data: superadminByID,
          error: false,
        });
      }
    }
    return res.status(404).json({
      message: 'Super admin not found',
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
      return res.status(400).json({
        message: 'You must specify an id',
        data: {},
        error: true,
      });
    }
    const { id } = req.params;
    const updatedAdmin = await models.SuperAdmin.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({
        message: `Superadmin with id:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
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
  getFilteredSuperadminsByFirstName,
  getFilteredSuperadminsByLastName,
  getFilteredSuperadminsByEmail,
  getFilteredSuperadminsByPassword,
  getFilteredSuperadminsByActive,
  getSuperadminById,
  updateSuperadmin,
  deleteSuperadminById,
};
