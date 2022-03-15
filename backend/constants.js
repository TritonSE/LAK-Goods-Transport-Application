import { ValidationError } from "./errors";
// Sample Users (for testing only)

export const SAMPLE_USER_PAYLOAD = {
  firstName: 'Trucker1',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
};

export const TEST_TRCUKER_1 = {
  firstName: 'Trucker1',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
  _id: '62306b0832164f9d56114029',
};

export const TEST_TRCUKER_2 = {
  firstName: 'Trucker2',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
  _id: '62306af1dd523e31b07bb10c',
};

export const TEST_CLIENT_1 = {
  firstName: 'Client1',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
  _id: '62306adf7f4a466b571f6b42'
}

export const getSessionUserId = (req) => { // For testing purposes
  if (!('user' in req.query)) throw ValidationError.USER_NOT_IN_SESSION;
  const alias = req.query.user;
  const map = {
    'client1': TEST_CLIENT_1,
    'trucker1': TEST_TRCUKER_1,
    'trucker2': TEST_TRCUKER_2,
  }
  return map[alias]._id;
};
