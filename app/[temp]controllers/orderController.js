const jwt = require('jsonwebtoken');
const orderRouter = require('express').Router();
const Order = require('../models/order');
const User = require('../models/user');
const { JWT_SEKRET } = require('../utils/config');

// create new order
orderRouter.post('/', async (request, response) => {
  const { token } = request;
  // decode token
  // FIXME: Older tokens that didn't have expiry are still working
  const decodedUser = jwt.verify(token, JWT_SEKRET);
  if (!decodedUser.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  // check if user exists in database
  const user = await User.findById(decodedUser.id);
  if (user) {
    // FIXME:any random item id can create an order
    // Verify items ids in request body before saving order
    // ...........
    // save order to orders collection
    const order = new Order({ ...request.body, userId: user.id });
    const savedOrder = await order.save();
    // update orders in user document
    user.orders = user.orders.concat(savedOrder.id);
    await user.save();
    return response.json(savedOrder);
  }
  return response.status(404).send('User does not exist');
});

module.exports = orderRouter;
