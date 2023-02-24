import express from 'express';

import {
    createAccount, signIn, logOut, changePassword, sendOTP, confirmOTP
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
    console.info('Signing into account: ', req.params.phone);

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

routes.put('/auth/changepass/:password', (req, res, next) => {
    initFirebase();
    console.info('Changing password to: ' + req.params.password);

    changePassword(req.params.password)
        .then((ret) => res.status(200).send(ret))
        .catch(next);
});

routes.get('/auth/sendotp/:phone', (req, res, next) => {
    initFirebase();
    console.info('Sending one-time-password to ', req.params.phone);

    sendOTP(req.params.phone)
        .then((user) => res.status(200).send(user))
        .catch(next);
});

routes.get('/auth/confirmotp/:code', (req, res, next) => {
    initFirebase();
    console.info('Confirming one-time-password with code ', req.params.code);

    confirmOTP(req.params.code)
        .then((user) => res.status(200).send(user))
        .catch(next);
});

export default routes;