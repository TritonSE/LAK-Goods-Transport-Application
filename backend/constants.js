import User from './models/user';

// Sample Users (for testing only)

export const SAMPLE_USER_PAYLOAD = {
  firstName: 'Trucker',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
};

export const SAMPLE_USER = User({
  firstName: 'Test',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
});

export const TEST_TRCUKER_1 = {
  firstName: 'Trucker',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
  _id: '6226010b246744007dbd2de8',
};

export const TEST_TRCUKER_2 = {
  firstName: 'Trucker',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
  _id: '6227f1be19f99bc3c8c2b5e1',
};

export const TEST_CLIENT_1 = {
  firstName: 'Client',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
  _id: '622600fe04c7a13b6e9b6933'
}

export const DUMMY_IN_SESSION_USER = TEST_CLIENT_1._id;
