const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const { MONGO_URI, PORT } = require('./config');
const routes = require('./routes');
const jobRoutes = require('./routes/job');

require('dotenv').config()

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
 * Create and run app
 */
const app = express()
const port = PORT || 3000; // TODO Revisit default PORT
app.use(bodyParser.urlencoded({
    extended: true
}));

// Parse application/json requests
app.use(bodyParser.json()); 

// app.use('/api/', routes);
app.use('/api/', jobRoutes);

//TODO Add Error Handling

app.listen(port, () => {
    console.info(`Server listening on port ${port}`)
});