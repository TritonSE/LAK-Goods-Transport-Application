const User = require('./models/user');
const SAMPLE_USER = User({
  firstName: 'Test',
  lastName: 'User',
  password: 'password',
  phone: 'number',
  location: 'location'
});  

module.exports = {
    SAMPLE_USER,
}