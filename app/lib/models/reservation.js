import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  persons: { type: Number, required: true },
  date: { type: Date, required: true },
  contact: { type: String, required: true },
  time: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
  email: String,
  specialRequest: String,
});

reservationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable no-param-reassign */
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
export default mongoose.models.reservation ||
  mongoose.model("reservation", reservationSchema);
