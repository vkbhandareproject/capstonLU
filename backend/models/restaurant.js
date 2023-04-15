const mongoose = require("mongoose");
const restaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    restaurantname: {
      type: String,
      required: true,
      unique: true,
    },
    restaurantaddress: {
      type: String,
      required: true,
      maxLength: 100,
    },
    // panNumber: { type: String, required: true, unique: true },
    contact: {
      type: String,
      required: true,
      unique: true,
      maxLength: 10,
      minLength: 10,
    },
    pincode: {
      type: Number,
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
    blocked: {
      type: Boolean,
      required: true,
      default: false,
    },
    blocktime: {
      type: Object,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const restaurantModel = mongoose.model("restaurants", restaurantSchema);
module.exports = restaurantModel;
