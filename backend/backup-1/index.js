const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
//importing routes
const regloginRouter = require("./routes/reg_login");
const adminModel = require("./models/admin");
const userModel = require("./models/user");
const restaurantProductModel = require("./models/restaurant_product");
/// middleware setup
app.use(cors());
app.use(express.json());
////////////
////////////
//db connection
mongoose
  .connect("mongodb://127.0.0.1:27017/foodcapstonedb")
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.log(err);
  });
// after data connction
app.use("/app", adminModel);
app.use("/restaurant", restaurantProductModel);
app.use("/user", userModel);
///////////////////////////////////////////////////////////
let port = process.env.PORT || 8000;
app.listen(port),
  () => {
    console.log(`Server is running on port ${port}`);
  };
