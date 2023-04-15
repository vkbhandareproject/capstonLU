const express = require("express");
const router = express.Router();
const productModel = require("../models/product");

//enpoints to create a product using promises
router.post("/create", (req, res) => {
  let product = req.body;

  if (product.publish !== undefined && product.publish === true) {
    product.approved = true;
  }
  productModel
    .create(product)
    .then((doc) => {
      res.send({ success: true, message: "Product Created Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, message: "Unable To Create a Product" });
    });
});

// endpoints to create products using async await

// router.post("/create", async (req, res) => {
//   let product = req.body;
//   try {
//     let doc = await productModel.create(product);
//     res.send({ success: false, message: "Product Created Successfully" });
//   } catch (err) {
//     console.log(err);
//     res.send({ success: false, message: "Unable To Create a Product" });
//   }
// });

router.put("/update/:product_id", (req, res) => {
  // console.log(req.params);
  let product_id = req.params.product_id;

  productModel
    .updateOne({ _id: product_id }, data)
    .then((info) => {
      res.send({ success: true, message: "Product Updated Successfully" });
    })
    .catch((err) => {
      console.log(err, "Product Not Updated");
      res.send({ message: "Product Is Not Updated Successfully" });
    });
});

///endpoint to read,get all products
router.get("/", async (req, res) => {
  try {
    let products = await productModel.find();
    res.send({ success: true, products });
  } catch (err) {
    console.log(err, "err in reading product");
    res.send({ success: false, message: "Error in reading products" });
  }
});

///endpoint to read,get single products
router.get("/:product_id", async (req, res) => {
  let product_id = req.params.product_id;
  try {
    let products = await productModel.findById(product_id);
    res.send({ success: true, products });
  } catch (err) {
    console.log(err, "err in reading product");
    res.send({ success: false, message: "Error in reading products" });
  }
});

// endpoint to delete product by id
router.delete("/delete/:product_id", (req, res) => {
  // console.log(req.params);
  let product_id = req.params.product_id;

  productModel
    .findByIdAndDelete({ _id: product_id }, data)
    .then((info) => {
      res.send({ success: true, message: "Product Deleted Successfully" });
    })
    .catch((err) => {
      console.log(err, "Product Not Deleted");
      res.send({ message: "Product Is Not Getting Deleted" });
    });
});
module.exports = router;
