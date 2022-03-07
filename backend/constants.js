import User from './models/user';

export const SAMPLE_USER = User({
  firstName: 'Test',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
  _id: '621bda9026575a70d82448c1',
});

export const SAMPLE_USER2 = User({
  firstName: 'Test2',
  lastName: 'User2',
  password: 'password2',
  phone: 'number2',
  location: 'location2'
});