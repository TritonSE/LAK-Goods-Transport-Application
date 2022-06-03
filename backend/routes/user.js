/**
 * TODO ONLY FOR TESTING PURPOSES. WILL BE REMOVED WHEN USER AUTH IS SETUP
 */
import express from 'express';
import { SAMPLE_USER_PAYLOAD } from '../constants';

import UserModel from '../models/user';
import { getUsers } from '../services/user';
import { validateId } from '../helpers';

const routes = express.Router();

routes.post('/', async (req, res, next) => {
    console.info('Creating a new user', req.query);
    const user = UserModel(SAMPLE_USER_PAYLOAD);
    
    await user.save();

    res.status(200).send(user);
});

routes.post('/get-by-ids', async (req, res, next) => {
    console.info('ROUTES: Getting user data by IDs');
   
    let users = null;
    try {
        let userIds = req.body.userIds;
        // Validate IDs
        for (let userId of userIds) {
            validateId(userId);
        }

        users = await getUsers(userIds);
    } catch (e) {
        next(e);
        return;
    }
    res.status(200).json({ message: 'User documents sent as ${users}', users: users })
})

export default routes;