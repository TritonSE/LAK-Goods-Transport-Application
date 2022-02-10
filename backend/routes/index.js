const routes = require('express').Router();
const User = require('../models/user');

routes.get('/hello', (req, res) => { // Only for testing
  res.json({message: 'Hello world! Lakta here'})
})

routes.post('/add-user', (req, res) => { // Only for testing
  // TODO Remove this endpoint when starting API development
  const sampleUser = User({
    firstName: 'Sample',
    lastName: 'User',
    password: 'password',
    phone: 'number',
  });  
  sampleUser.save((err) => {
    console.error('Error occured while saving', err);
  });
  res.json({message: 'Created Sample User', data: sampleUser})
});

module.exports = routes;