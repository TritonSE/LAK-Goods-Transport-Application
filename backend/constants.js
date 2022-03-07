import User from './models/user';

export const SAMPLE_USER_PAYLOAD = {
  firstName: 'Test',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
};

export const SAMPLE_USER_ID = '62252de05a86addc14f97018';

export const SAMPLE_USER = User({
  firstName: 'Test',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
});