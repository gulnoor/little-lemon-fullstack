const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SEKRET } = require('../utils/config');
const loginRouter = require('express').Router();

loginRouter.post('/', async (request, response) => {
  const { username, password } = { ...request.body };
  const user = await User.findOne({ username });
  if (user === null) {
    return response.status(404).send('User not found');
  }
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (passwordCorrect) {
    const token = jwt.sign({ username, id: user.id }, JWT_SEKRET, {
      expiresIn: 1800,
    });
    return response.json(token);
  }
  return response.status(401).send('password incorrect');
});
module.exports = loginRouter;
