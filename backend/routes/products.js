const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const formidable = require('formidable')
const fs = require('fs');



//enpoints to create a product using promises
router.post("/create", (req, res) => {
  let product = {images:[]};
  const form = new formidable.IncomingForm();
  form.parse(req);
  //
  form.addListener("field",(property, value) => {
    product[property]=value;
  });



  form.addListener("file",(property, file) => {
    
      let fileData = fs.readFileSync(file.filepath);
      let extention = file.originalFilename.split(".")[1].toLowerCase();
      let newPath = null;
      let imagepath = null;
      if(extention==="jpg" || extention === "png" || extention === "jpeg" || extention === "webp"){
        newPath="./products/"+file.newFilename+"."+extention;
        imagepath='http://localhost:8000/pro/images/'+file.newFilename+"."+extention;
        fs.writeFileSync(newPath,fileData);
        product.images.push(imagepath);
      }
      else if(extention==='avif'){
        alert("AVIF format is not allowed")
      }
      
     

  });
  
  form.on("end",() => {
    if (typeof product.tags === 'string') {
      product.tags = product.tags.split(',');
    }
    // console.log(product);
    productModel.create(product)
    .then((data)=>{
      console.log(data);
      res.status(201).send({success:true, message:"Product Created Successfully"})
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).send({success:false, message:"Prodcut Not Created UnSuccessful"});
    });
  });

  // console.log("all working");
});

router.put("/update/:product_id", (req, res) => {
  let product_id = req.params.product_id;

  productModel
    .updateOne({ _id: product_id }, req.body)
    .then((info) => {
      res.send({ success: true, message: "Product Updated Successfully" });
    })
    .catch((err) => {
      console.log(err, "Product Not Updated");
      res.send({success: false, message: "Product Is Not Updated Successfully" });
    });
});

///endpoint to read,get all products
router.get("/", async (req, res) => {
  try {
    let products = await productModel.find().populate('category'); // populate store id , we dont want id ,to store related name, use populate with property category
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
    .findByIdAndDelete( product_id)
    .then((info) => {
      res.send({ success: true, message: "Product Deleted Successfully" });
    })
    .catch((err) => {
      console.log(err, "Product Not Deleted");
      res.send({success: false, message: "Product Is Not Getting Deleted" });
    });
});
module.exports = router;
