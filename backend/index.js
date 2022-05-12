import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import jobRoutes from './routes/job';
import userRoutes from './routes/user';
import { MONGO_URI, PORT } from './config';
import { CustomError, InternalError } from './errors';
import imageRoutes from './routes/image';
import cors from 'cors';

dotenv.config()

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
}

/**
 * Create and run app
 */
const app = express()
app.use(cors());
const port = PORT || 3000; // TODO Revisit default PORT
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

// Parse application/json requests
app.use(bodyParser.json()); 

app.use('/api/users/', userRoutes)
app.use('/api/jobs/', jobRoutes); // Job related routes
app.use('/api/images/', imageRoutes); // Image retrieval routes for relevant jobs

app.use(errorHandler);

app.listen(port, () => {
    console.info(`Server listening on port ${port}`)
});