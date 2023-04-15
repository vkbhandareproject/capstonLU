const express = require("express");
const router = express.Router();
const categoryModel = require("../models/category");

//enpoints to create a category using promises
router.post("/create", (req, res) => {
  let category = req.body;

  categoryModel
    .create(category)
    .then((doc) => {
      res.send({ success: true, message: "Category Created Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, message: "Unable To Create a Category" });
    });
});

// endpoints to create categories using async await

// router.post("/create", async (req, res) => {
//   let category = req.body;
//   try {
//     let doc = await categoryModel.create(category);
//     res.send({ success: false, message: "category Created Successfully" });
//   } catch (err) {
//     console.log(err);
//     res.send({ success: false, message: "Unable To Create a category" });
//   }
// });

router.put("/update/:category_id", (req, res) => {
  // console.log(req.params);
  let category_id = req.params.category_id;

  categoryModel
    .updateOne({ _id: category_id }, data)
    .then((info) => {
      res.send({ success: true, message: "category Updated Successfully" });
    })
    .catch((err) => {
      console.log(err, "category Not Updated");
      res.send({ message: "category Is Not Updated Successfully" });
    });
});

///endpoint to read,get all categories
router.get("/", async (req, res) => {
  try {
    let categories = await categoryModel.find();
    res.send({ success: true, categories });
  } catch (err) {
    console.log(err, "err in reading category");
    res.send({ success: false, message: "Error in reading categories" });
  }
});

///endpoint to read,get single categories
router.get("/:category_id", async (req, res) => {
  let category_id = req.params.category_id;
  try {
    let categories = await categoryModel.findById(category_id);
    res.send({ success: true, categories });
  } catch (err) {
    console.log(err, "err in reading category");
    res.send({ success: false, message: "Error in reading categories" });
  }
});

// endpoint to delete category by id
router.put("/delete/:category_id", (req, res) => {
  // console.log(req.params);
  let category_id = req.params.category_id;

  categoryModel
    .findByIdAndDelete({ _id: category_id }, data)
    .then((info) => {
      res.send({ success: true, message: "category Deleted Successfully" });
    })
    .catch((err) => {
      console.log(err, "category Not Deleted");
      res.send({ message: "category Is Not Getting Deleted" });
    });
});
module.exports = router;
