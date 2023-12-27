import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter address name"],
  },
  buildingNumber: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "Please enter city"],
  },

  contactNumber: {
    type: String,
    required: [true, "Please enter contact no"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Address = model("Product", addressSchema);

export default Address;
