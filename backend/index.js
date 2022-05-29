import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import jobRoutes from './routes/job';
<<<<<<< HEAD
import { MONGO_URI, PORT } from './config';
import { CustomError } from './errors';
import imageRoutes from './routes/image';
import authRoutes from './routes/auth';

import { initializeApp } from 'firebase/app';
import admin from 'firebase-admin';
import * as serviceAccount from './auth/service.json';

dotenv.config();
=======
import userRoutes from './routes/user';
import { MONGO_URI, PORT } from './config';
import { CustomError, InternalError } from './errors';
import imageRoutes from './routes/image';

dotenv.config()
>>>>>>> main

/**
 * Database connection
 */
//TODO Look into flags - useNewUrlParser, useUnifiedTopology
let dbConnectionFailure = (err) => console.error('Error connecting to database', err);

mongoose.connect(MONGO_URI).catch(dbConnectionFailure)
mongoose.connection.once("open", () => {
    console.info("Established connection to MongoDB.");
});
mongoose.connection.on('error', dbConnectionFailure);

/**
 * Error handler
 */
const errorHandler = (err, req, res, next) => {
<<<<<<< HEAD
    if (!(err instanceof CustomError)) { 
        // Catch all that directs errors to default error handler
        next(err);
        return;
    }
    console.error(err.format(false)); // Internal Error Logging
    res.status(err.statusCode).send(err.format(true));
}

export function initFirebase() {

    const firebaseConfig = {
        apiKey: "AIzaSyAHrRD9SL3wnoVUM9yzG8lxScWf92pWL38",
        authDomain: "laakta-ucsd.firebaseapp.com",
        projectId: "laakta-ucsd",
        storageBucket: "laakta-ucsd.appspot.com",
        messagingSenderId: "892160174879",
        appId: "1:892160174879:web:d58d800b0b7cd700b25e2a",
        measurementId: "G-ZFLMC1NS04"
    };

    initializeApp(firebaseConfig);
}

export function initAdmin() {
    let init = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount.default),
            databaseURL: 'https://laakta-ucsd.firebaseio.com'
        },
        'admin' // this name will be used to retrieve firebase instance. e.g. admin.database();
    );
    return init;
=======
    if (!err) return;
    if (!(err instanceof CustomError)) { 
        // All unhandled errors are marked as unknown internal errors
        err = InternalError.UNKNOWN.addContext(err.stack)
    }
    if (err instanceof InternalError) // Internal Error Logging
        console.error(err.format(false)); 
    res.status(err.statusCode).json({
        message: err.format(true),
        error: true, 
    });
>>>>>>> main
}

/**
 * Create and run app
 */
const app = express()
const port = PORT || 3000; // TODO Revisit default PORT
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

// Parse application/json requests
app.use(bodyParser.json()); 

<<<<<<< HEAD
app.use('/api/', jobRoutes); // Job related routes
app.use('/api/', imageRoutes); // Image retrieval routes for relevant jobs
app.use('/api/', authRoutes); // Auth routes
=======
app.use('/api/users/', userRoutes)
app.use('/api/jobs/', jobRoutes); // Job related routes
app.use('/api/images/', imageRoutes); // Image retrieval routes for relevant jobs
>>>>>>> main

app.use(errorHandler);

app.listen(port, () => {
    console.info(`Server listening on port ${port}`)
});