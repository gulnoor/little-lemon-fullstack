import mongoose from "mongoose";
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  rating: Number,
  image: String,
  category: { type: String, required: true },
});
menuItemSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable no-param-reassign */
    // returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
export default mongoose.models.menuItem ||
  mongoose.model("menuItem", menuItemSchema);
