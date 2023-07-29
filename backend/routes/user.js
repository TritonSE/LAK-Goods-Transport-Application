// Routes are available through {API_URL}/api/users/
import express from 'express';
import multer from 'multer';

import {
  getAllUsers,
  getUser,
  getUsers,
  registerUser,
  updateUser,
  updateDriverRegistrationStatus,
} from '../services/user';
import { getSessionUserId } from '../helpers';
import { VERIFICATION_STATUS_FIELDS } from '../models/user';

const routes = express.Router();
const upload = multer({ storage: multer.memoryStorage() }).array('images');

routes.put('/driver-verification-status', upload, async (req, res, next) => {
  const userId = req.body.id;
  console.info('ROUTES: Editing driver verification status', userId);

  try {
    const { verificationStatus } = req.body;
    if (
      verificationStatus &&
      !VERIFICATION_STATUS_FIELDS.includes(verificationStatus)
    ) {
      return res.status(400).json({ error: 'Invalid verification status' });
    }
    updateDriverRegistrationStatus(userId, verificationStatus);
  } catch (e) {
    next(e);
    return res
      .status(500)
      .json({ error: 'Could not update driver verification status' });
  }

  return res.status(200).json({
    message: 'User edited successfully',
    userId: userId,
  });
});

// getting one of the users by their id
routes.get('/:userid', async (req, res, next) => {
  console.info(`ROUTES: Getting user by ID ${req.params.userid}`);

  let user = null;
  try {
    const userId = req.params.userid;
    const requestingUserId = getSessionUserId(req);

    user = await getUser(userId, requestingUserId);
  } catch (e) {
    next(e);
    return;
  }

  res.status(200).json({
    message: `User document sent as ${user}`,
    user: user,
  });
});

// Note that this should ideally be a GET request because this does not
// mutate our DB in any way but since GET requests don't support a body,
// we are using a POST type
routes.post('/get-by-ids', async (req, res, next) => {
  console.info(`ROUTES: Getting user data by IDs ${req.body.userIds}`);
  let users = null;
  try {
    const { userIds } = req.body;
    const requestingUserId = getSessionUserId(req);
    users = await getUsers(userIds, requestingUserId);
  } catch (e) {
    console.log(e);
    next(e);
    return;
  }
  res
    .status(200)
    .json({ message: `User documents sent as ${users}`, users: users });
});

routes.post('/get-all-users', async (req, res, next) => {
  console.info(`ROUTES: Getting all users`);
  let users = null;
  try {
    const requestingUserId = getSessionUserId(req);
    users = await getAllUsers(requestingUserId);
  } catch (e) {
    console.log(e);
    next(e);
    return;
  }
  res
    .status(200)
    .json({ message: `User documents sent as ${users}`, users: users });
});

routes.post('/', upload, async (req, res, next) => {
  console.info('ROUTES: Creating new user', req.query);

  let user = null;
  try {
    user = await registerUser(req.body, req.files || []);
  } catch (e) {
    next(e);
    return;
  }

  res.status(200).json({
    message: 'User created successfully',
    userId: user._id,
  });
});

routes.put('/:userid', upload, async (req, res, next) => {
  console.info('ROUTES: Editing user', req.params.userid);
  let user = null;
  try {
    const userId = req.params.userid;

    user = req.body;

    // Validate user object properties
    const {
      firstName,
      lastName,
      phone,
      location,
      driverLicenseId,
      vehicleData,
      verificationStatus,
    } = user;
    if (!firstName || !lastName || !phone || !location) {
      return res
        .status(400)
        .json({ error: 'Missing required user properties' });
    }
    if (driverLicenseId && !vehicleData) {
      return res
        .status(400)
        .json({ error: 'Missing required vehicleData for driver' });
    }
    if (
      verificationStatus &&
      !VERIFICATION_STATUS_FIELDS.includes(verificationStatus)
    ) {
      return res.status(400).json({ error: 'Invalid verification status' });
    }
    user = await updateUser(userId, user, req.files || []);

    return res.status(200).json({
      message: 'User edited successfully',
      userId: user._id,
    });
  } catch (e) {
    next(e);
    return res.status(500).json({ error: 'Could not put User' });
  }
});

export default routes;
