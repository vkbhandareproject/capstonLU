const mongoose = require("mongoose");
const restaurantProductSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products", // ..models/product
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants", // ..models/restaurant
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const restaurantProductModel = mongoose.model(
  "restaurantProducts",
  restaurantProductSchema
);
module.exports = restaurantProductModel;
