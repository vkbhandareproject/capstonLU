const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
//importing routes
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurant");
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/category");
/// middleware setup
app.use(cors());
app.use(express.json());
app.use('/pro/images',express.static('./products'));
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
app.use("/admin", adminRouter);
app.use("/restaurant", restaurantRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
///////////////////////////////////////////////////////////
let port = process.env.PORT || 8000;
app.listen(port),
  () => {
    console.log(`Server is running on port ${port}`);
  };
