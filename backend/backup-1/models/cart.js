const mongoose = require("mongoose");
const cartSchema = mongoose.Schema(
  {
    restaurant_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurantProducts",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("carts", userSchema);
module.exports = cartModel;
