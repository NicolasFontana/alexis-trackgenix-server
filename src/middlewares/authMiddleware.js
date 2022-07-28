import firebase from '../helper/firebase';

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400)
      .json({ message: 'Provide a token' });
  }
  try {
    const response = await firebase.auth().verifyIdToken(token);
    req.firebaseUid = response.uid;
    return next();
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

const authAdmin = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400)
      .json({ message: 'Provide a token' });
  }
  try {
    const response = await firebase.auth().verifyIdToken(token);
    if (response.role !== 'ADMIN') {
      throw new Error();
    }
    req.firebaseUid = response.uid;
    return next();
  } catch (error) {
    return res.status(400).json({
      message: 'Unauthorize. You must be an admin to access.',
      data: undefined,
      error: true,
    });
  }
};

const authSuperAdmin = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400)
      .json({ message: 'Provide a token' });
  }
  try {
    const response = await firebase.auth().verifyIdToken(token);
    if (response.role !== 'SUPERADMIN') {
      throw new Error();
    }
    req.firebaseUid = response.uid;
    return next();
  } catch (error) {
    return res.status(400).json({
      message: 'Unauthorize. You must be an superadmin to access.',
      data: undefined,
      error: true,
    });
  }
};

export default { authUser, authAdmin, authSuperAdmin };
