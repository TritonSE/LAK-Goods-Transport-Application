const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('dotenv').config()

/**
 * Database connection
 */
//TODO Look into flags - useNewUrlParser, useUnifiedTopology
let dbConnectionFailure = (err) => console.error('Error connecting to database', err);

mongoose.connect(process.env.MONGO_URI).catch(dbConnectionFailure)
mongoose.connection.once("open", () => {
    console.info("Established connection to MongoDB.");
});
mongoose.connection.on('error', dbConnectionFailure);

/**
 * Create and run app
 */
const app = express()
const port = process.env.PORT || 3000; // TODO Revisit default PORT

app.use(bodyParser.json()); // Parse all JSON requests

app.use('/api/', routes);

app.listen(port, () => {
    console.info(`Server listening on port ${port}`)
});