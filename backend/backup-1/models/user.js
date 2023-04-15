const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
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
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    profilePic: {
      type: String,
      default: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20190710%2Fourmid%2Fpngtree-user-vector-avatar-png-image_1541962.jpg&tbnid=cPXYODj90LFBgM&vet=12ahUKEwjYg-nV2ZL-AhWxmeYKHehMAo8QMygBegUIARDnAQ..i&imgrefurl=https%3A%2F%2Fpngtree.com%2Fso%2Favatar&docid=UUPtDBJdc_Dc4M&w=360&h=360&q=profile%20avatar%20png&client=firefox-b-d&ved=2ahUKEwjYg-nV2ZL-AhWxmeYKHehMAo8QMygBegUIARDnAQ",
      required: true,
    },
    addresses: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
