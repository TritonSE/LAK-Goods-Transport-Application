const User = require('./models/user');
const SAMPLE_USER = User({
  firstName: 'Test',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location'
});
const SAMPLE_USER2 = User({
  firstName: 'Test2',
  lastName: 'User2',
  password: 'password2',
  phone: 'number2',
  location: 'location2'
});

module.exports = {
    SAMPLE_USER,
}