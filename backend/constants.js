import User from './models/user';

export const SAMPLE_USER_PAYLOAD = {
  firstName: 'Trucker',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
};

export const SAMPLE_USER_ID = '622600fe04c7a13b6e9b6933';

export const SAMPLE_USER = User({
  firstName: 'Test',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
});