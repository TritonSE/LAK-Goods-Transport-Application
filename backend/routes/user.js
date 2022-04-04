/**
 * TODO ONLY FOR TESTING PURPOSES. WILL BE REMOVED WHEN USER AUTH IS SETUP
 */
import express from 'express';
import { SAMPLE_USER_PAYLOAD } from '../constants';

import UserModel from '../models/user';
const routes = express.Router();

routes.post('/', async (req, res, next) => {
    console.info('Creating a new user', req.query);
    const user = UserModel(SAMPLE_USER_PAYLOAD);
    
    await user.save();

    res.status(200).send(user);
});

export default routes;