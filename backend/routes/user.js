/**
 * TODO ONLY FOR TESTING PURPOSES. WILL BE REMOVED WHEN USER AUTH IS SETUP
 */
import express from 'express';
import multer from 'multer'; 

import { getUser, getUsers, registerUser, updateUser } from '../services/user';
import { validateId } from '../helpers';
import { getSessionUserId } from '../constants';


const routes = express.Router();
const upload = multer({ storage: multer.memoryStorage() }).array("images");

routes.get('/:userid', async (req, res, next) => {
    console.info('ROUTES: Getting user by ID');

    let user = null;
    try {
        const userId = validateId(req.params.userid);
        const requestingUserId = getSessionUserId(req);

        user = await getUser(userId, requestingUserId);
    } catch(e) {
        next(e);
        return;
    }

    res.status(200).json({
        message: `User document sent as ${user}`,
        user: user
    });
})

// Note that this should ideally be a GET request because this does not 
// mutate our DB in any way but since GET requests don't support a body, 
// we are using a POST type
routes.post('/get-by-ids', async (req, res, next) => {
    console.info('ROUTES: Getting user data by IDs');
   
    let users = null;
    try {
        let userIds = req.body.userIds;
        let validatedIds = []
        // Validate IDs
        for (let userId of userIds) {
            validatedIds.push(validateId(userId));
        }

        const requestingUserId = getSessionUserId(req);
        users = await getUsers(validatedIds, requestingUserId);
    } catch (e) {
        next(e);
        return;
    }
    res.status(200).json({ message: `User documents sent as ${users}`, users: users })
})

routes.post('/', upload, async (req, res, next) => {
    console.info('ROUTES: Creating new user', req.query)
    
    let user = null;
    try {
        user = await registerUser(req.body, req.files || []);
    } catch(e){
        next(e);
        return;
    }

    res.status(200).json({
        message: 'User created successfully',
        userId: user._id
    });
})

routes.put('/:userid', upload, async (req, res, next) => {
    console.info('ROUTES: Editing user', req.params.userid);
    let user = null;
    try {
        user = await updateUser(req.params.userid, req.body, req.files || []);
    } catch(e) {
        next(e);
        return;
    }

    res.status(200).json({
        message: 'User edited successfully',
        userId: user._id
    });
})

export default routes;