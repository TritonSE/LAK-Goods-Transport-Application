import { ValidationError } from "./errors";
// Sample Users (for testing only)

export const SAMPLE_USER_PAYLOAD = {
  firstName: 'Client2',
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
  _id: '635246c11402cc7134325d93',
};

export const TEST_TRCUKER_2 = {
  firstName: 'Trucker2',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
  _id: '635247c074ca71554d2b8a35',
};

export const TEST_CLIENT_1 = {
  firstName: 'Client1',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
  _id: '635247cc2fdd8166dd9a3747'
}

export const TEST_CLIENT_2 = {
  firstName: 'Client2',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location',
  _id: '635247d1b0ddabd341688615'
}

export const getSessionUserId = (req) => { // For testing purposes
  const map = {
    'client1': TEST_CLIENT_1,
    'client2': TEST_CLIENT_2,
    'trucker1': TEST_TRCUKER_1,
    'trucker2': TEST_TRCUKER_2,
  }
  if (!('user' in req.query)) return map['client1']._id;
  const alias = req.query.user;
  return map[alias]._id;
};
