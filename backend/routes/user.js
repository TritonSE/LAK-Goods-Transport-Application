/**
 * TODO ONLY FOR TESTING PURPOSES. WILL BE REMOVED WHEN USER AUTH IS SETUP
 */
import express from 'express';
import multer from 'multer';

import { getUser, getUsers, registerUser } from '../services/user';
import { getSessionUserId } from '../constants';

const routes = express.Router();
const upload = multer({ storage: multer.memoryStorage() }).array('images');

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
export default routes;
