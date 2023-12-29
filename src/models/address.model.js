import mongoose, { Schema, model } from "mongoose";

const addressSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter address name"],
  },
  building: {
    type: String,
  },
  street: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "Please enter city"],
  },
  isDefault: {
    type: Boolean,
  },
  phone: {
    type: String,
    required: [true, "Please enter contact no"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
// Duplicate the ID field.
addressSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
addressSchema.set("toJSON", {
  virtuals: true,
});
const Address = model("Address", addressSchema);

export default Address;
