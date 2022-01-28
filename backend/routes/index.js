const routes = require('express').Router();

routes.get('/api', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;