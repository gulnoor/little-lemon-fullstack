const userController = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

userController.post('/', async (request, response) => {
  // TODO: add password validation
  const userData = request.body;
  const hash = await bcrypt.hash(userData.password, 10);
  delete userData.password;
  userData.passwordHash = hash;
  const user = new User(userData);
  const result = await user.save();
  return response.json(result);
});
module.exports = userController;
