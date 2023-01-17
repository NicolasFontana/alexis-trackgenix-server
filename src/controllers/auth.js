import Employees from '../models/Employees';
import Admins from '../models/Admins';
import SuperAdmins from '../models/Super-admins';

const getMe = async (req, res) => {
  try {
    const employee = await Employees.findOne({ firebaseUid: req.firebaseUid });
    if (employee) {
      return res.status(201).json({
        message: 'Employee found',
        data: employee,
      });
    }

    const admin = await Admins.findOne({ firebaseUid: req.firebaseUid });
    if (admin) {
      return res.status(201).json({
        message: 'Admin found',
        data: admin,
      });
    }
    const superAdmin = await SuperAdmins.findOne({ firebaseUid: req.firebaseUid });
    if (superAdmin) {
      return res.status(201).json({
        message: 'Super Admin found',
        data: superAdmin,
      });
    }

    return res.status(204).json({
      message: 'User not found',
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

export default getMe;
