import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jobRoutes from './routes/job';
import { MONGO_URI, PORT } from './config';
import { CustomError } from './errors';
import imageRoutes from './routes/image';

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
    if (!(err instanceof CustomError)) { 
        // Catch all that directs errors to default error handler
        next(err);
        return;
    }
    console.error(err.format(false)); // Internal Error Logging
    res.status(err.statusCode).send(err.format(true));
}

/**
 * Create and run app
 */
const app = express()
const port = PORT || 3000; // TODO Revisit default PORT
app.use(bodyParser.urlencoded({
    extended: true
}));

// Parse application/json requests
app.use(bodyParser.json()); 

app.use('/api/', jobRoutes); // Job related routes
app.use('/api/', imageRoutes); // Image retrieval routes for relevant jobs

app.use(errorHandler);

app.listen(port, () => {
    console.info(`Server listening on port ${port}`)
});