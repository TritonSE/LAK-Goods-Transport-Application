const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000; // TODO Revisit default PORT

app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

