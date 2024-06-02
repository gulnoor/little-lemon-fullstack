const menuRouter = require('express').Router();
const MenuItems = require('../models/menuItem');

menuRouter.get('/', async (request, response) => {
  const menu = await MenuItems.find({});
  return response.json(menu);
});
menuRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await MenuItems.findById(id);
  return response.json(result);
});
menuRouter.post('/', async (request, response) => {
  if (request.body.length > 1) {
    const items = request.body.map((item) => new MenuItems(item));
    const result = await MenuItems.insertMany(items);
    return response.json(result);
  }
  const item = new MenuItems(request.body);
  const result = await item.save();
  return response.json(result);
});

// menuRouter.put('/:id', async (request, response) => {
//   const { id } = request.params;
//   const result = await MenuItems.findByIdAndUpdate(id, request.body, {
//     new: true,
//   });
//   return response.json(result);
// });

// menuRouter.delete('/:id', async (request, response) => {
//   const { id } = request.params;
//   await MenuItems.findByIdAndDelete(id);
//   return response.status(204).end();
// });
module.exports = menuRouter;
