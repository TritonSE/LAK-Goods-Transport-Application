import express from 'express';

import {
    createAccount, signIn, logOut
} from '../auth/account.js';
import {
    initFirebase
} from '../index.js';

const routes = express.Router();

routes.get('/auth/create/:phone/:password', (req, res, next) => {
    initFirebase();
    console.info('Creating account: ', req.params.phone);

    createAccount(req.params.phone, req.params.password)
        .then((user) => res.status(200).send(user))
        .catch(next);
});

routes.get('/auth/signin/:phone/:password', (req, res, next) => {
    initFirebase();
    console.info('Singing into account: ', req.params.phone);

    signIn(req.params.phone, req.params.password)
        .then((user) => res.status(200).send(user))
        .catch(next);
});

routes.get('/auth/signout', (req, res, next) => {
    initFirebase();
    console.info('Signing out of account');

    logOut()
        .then((ret) => res.status(200).send(ret))
        .catch(next);
});

export default routes;