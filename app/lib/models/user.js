import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reservation",
    },
  ],
});
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable no-param-reassign */
    returnedObject.id = returnedObject._id
      ? returnedObject._id.toString()
      : returnedObject.id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});
export default mongoose.models?.user || mongoose.model("user", userSchema);
