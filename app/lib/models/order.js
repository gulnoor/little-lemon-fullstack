import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menuItem",
    },
  ],
  paymentStatus: { type: String, default: "pending" },
  paymentIntentId: { type: String, required: true },
});

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable no-param-reassign */
    returnedObject.id = returnedObject._id
      ? returnedObject._id.toString()
      : returnedObject.id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.paymentIntentId;
  },
});
export default mongoose.models?.order || mongoose.model("order", orderSchema);
