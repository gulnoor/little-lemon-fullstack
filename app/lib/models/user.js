import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable no-param-reassign */
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});
export default mongoose.models.user || mongoose.model("user", userSchema);
