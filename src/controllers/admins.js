import adminModel from '../models/Admins';

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await adminModel.find({});
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
      const admin = await adminModel.findById(req.params.id);
      return res.status(200).json({
        message: 'Admin by id',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with this id ${req.params.id} not found`,
      data: undefined,
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

// Get admins by firstName
const getAdminByFirstName = async (req, res) => {
  try {
    if (req.params.firstName) {
      const admin = await adminModel.findOne(req.params.firstName);
      return res.status(200).json({
        message: 'Admin by first name',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with this first name ${req.params.firstName} not found`,
      data: undefined,
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

// Get admins by lastName
const getAdminByLastName = async (req, res) => {
  try {
    if (req.params.lastName) {
      const admin = await adminModel.findOne(req.params.lastName);
      return res.status(200).json({
        message: 'Admin by last name',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with this last name ${req.params.lastName} not found`,
      data: undefined,
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

// Get admins by active status
const getAdminByStatus = async (req, res) => {
  try {
    if (req.params.active) {
      const adminsList = await adminModel.find(req.params.active);
      return res.status(200).json({
        message: 'Admins by active status',
        data: adminsList,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with the active of ${req.params.active} not found`,
      data: undefined,
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

/*
// Create admin
router.post('/', (req, res) => {
  const rb = req.body;
  const ids = admins.reduce((previousValue, currentValue) => (previousValue
     <= currentValue.id ? currentValue.id + 1 : previousValue), 0);
  if (!ids || !rb.firstName || !rb.lastName || !rb.email || !rb.password || (rb.active == null)) {
    res.status(400).json({ msg: 'Please include the solicited information' });
  }

  admins.push({ id: ids, ...req.body });
  const adminsWithNew = admins;
  fs.writeFile('src/data/admins.json', JSON.stringify(adminsWithNew), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        msg: 'Admin created', admins: adminsWithNew,
      });
    }
  });
});

// Delete admin
router.delete('/id/:id', (req, res) => {
  const found = admins.find((admin) => admin.id === Number(req.params.id));
  const restOfTheAdmins = admins.filter((admin) => admin.id !== Number(req.params.id));
  if (found) {
    fs.writeFile('src/data/admins.json', JSON.stringify(restOfTheAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          msg: 'Admin deleted', admins: restOfTheAdmins,
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});

// Update admin
router.put('/id/:id', (req, res) => {
  const found = admins.some((admin) => admin.id === Number(req.params.id));
  if (found) {
    const restOfTheAdmins = admins.filter((admin) => admin.id !== Number(req.params.id));
    const copyOfAdmin = admins.find((admin) => admin.id === Number(req.params.id));
    const {
      firstName, lastName, email, password, active,
    } = req.body;
    const updatedAdmin = {
      id: Number(req.params.id),
      firstName: (firstName || copyOfAdmin.firstName),
      lastName: (lastName || copyOfAdmin.lastName),
      email: (email || copyOfAdmin.email),
      password: (password || copyOfAdmin.password),
      active: Boolean(active ?? copyOfAdmin.active),
    };
    restOfTheAdmins.push(updatedAdmin);
    fs.writeFile('src/data/admins.json', JSON.stringify(restOfTheAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ msg: 'Admin updated', admins: restOfTheAdmins });
      }
    });
  } else {
    res.status(400).json({ msg: `No admins with the id of ${req.params.id}` });
  }
});
*/

export default {
  getAllAdmins,
  getAdminById,
  getAdminByFirstName,
  getAdminByLastName,
  getAdminByStatus,
};
