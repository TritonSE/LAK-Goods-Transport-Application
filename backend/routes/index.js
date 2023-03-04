import express from 'express';

import User from '../models/user';

const routes = express.Router();

routes.get('/hello', (req, res) => {
  // Only for testing
  res.json({ message: 'Hello world! Lakta here' });
});

routes.post('/user', (req, res) => {
  // Only for testing
  // TODO Remove this endpoint when starting API development
  const sampleUser = User({
    firstName: 'Test',
    lastName: 'User',
    password: 'password',
    phone: 'number',
    location: 'location',
  });
  sampleUser.save((err) => {
    console.error('Error occured while saving', err);
  });
  res.json({ message: 'Created Sample User', data: sampleUser });
});

export default routes;
