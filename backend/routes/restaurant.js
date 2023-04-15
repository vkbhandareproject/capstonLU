const express = require("express");
const router = express.Router();
const restaurantProductModel = require("../models/restaurant_product");
const restaurantModel = require("../models/restaurant");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

//endpoint to create register resturant
router.post("/create", (req, res) => {
  let regBodydata = req.body;
  // console.log(regBodydata.data);

  bcryptjs.genSalt(10, (err, salt) => {
    // salt storing key
    if (!err) {
      bcryptjs.hash(regBodydata.password, salt, (err, newpass) => {
        if (!err) {
          regBodydata.password = newpass;

          restaurantModel
            .create(regBodydata)
            .then((doc) => {
              res.send({ success: true, message: "registered successfully" });
            })
            .catch((err) => {
              console.log(err);
              res.send({
                success: false,
                message: "Not registered successfully",
              });
            });
        } else {
          console.log(err);
          res.send({ success: false, message: "Not registered" });
        }
      });
    }
  });
});

// login part
router.post("/login", (req, res) => {
  let loginBodyData = req.body;

  restaurantModel
    .findOne({ email: loginBodyData.email })
    .then((loginUserData) => {
      // console.log(loginUserData);
      if (loginUserData !== null) {
        bcryptjs.compare(
          loginBodyData.password,
          loginUserData.password,
          (err, matchedPass) => {
            if (matchedPass === true) {
              jwt.sign(
                { email: loginBodyData.email },
                "secretkey",
                (err, token) => {
                  if (!err) {
                    res.status(200).send({
                      success: true,
                      token: token,
                      email: loginUserData.email,
                      userid: loginUserData._id,
                    });
                    console.log("Login Successfull");
                  } else {
                    res.send({
                      err: "Password Not Matched",
                      message: "Some issue there",
                    });
                  }
                }
              );
            } else {
              res.status(401).send({
                err: "Password Not Matched",
                message: "Some issue there",
              });
            }
          }
        );
      } else {
        res
          .status(404)
          .send({ success: false, message: "email does not exist" });
      }
    })
    .catch((err) => {
      res.status().send("some err with the server", err);
      console.log("some err with the server", err);
    });
});

//routes / endpoints to update/approve a restaurant

router.put("/approverestaurant/restaurant_id", (req, res) => {
  let restaurant_id = req.params.restaurant_id;
  let data = req.body;

  restaurantModel
    .updateOne({ _id: restaurant_id }, data)
    .then((info) => {
      // console.log("info");
      res.send({ message: "restaurant approved " });
    })
    .catch((err) => {
      console.log("error",err);
      res.send({ message: "Error in update restaurant approve " });
    });
});

//endpoints to add dishes to sell menu

router.post("/addNewDish", (req, res) => {
  let bodyData = req.body;

  restaurantProductModel
    .create(bodyData)
    .then((doc) => {
      res.send({ message: "New Dish Added To Sell" });
    })
    .catch((err) => {
      console.log(err, "Error in adding new dishes");
    });
});

//endpoint to delete any dish from sell menu
router.delete("/delete/:restaurant_id", (req, res) => {
  let restaurant_id = req.params.restaurant_id;

  restaurantProductModel
    .findByIdAndDelete(restaurant_id)
    .then((doc) => {
      res.send({ message: "Successfully Deleted From From Selling Dishes" });
    })
    .catch((err) => {
      res.send({ message: "Dishes cannot deleted from selling , some error" });
      console.log(err, "Dishes cannot deleted from selling , some error");
    });
});

/// endpoints to update any dish / product from restaurants

// router.put("/update/:restaurant_id", (req, res) => {
//   let restaurant_id = req.params.restaurant_id;
//   let data = req.body;
//   restaurantProductModel
//     .updateOne(restaurant_id, data) // update that id with body data
//     .then((doc) => {
//       console.log(
//         res.send({ message: "Successfully Updated From From Selling Dishes" })
//       );
//     });
// });

router.put("/update/:restaurant_id", (req, res) => {
  let restaurant_id = req.params.restaurant_id;
  let data = req.body;
  restaurantProductModel
    .updateOne({ _id: restaurant_id }, data) // update that id with body data
    .then((doc) => {
      console.log(
        res.send({ message: "Successfully Updated From From Selling Dishes" })
      );
    });
});

//endpoints to get all restaurant

router.get('/restaurants',async (req,res)=>{

  let restaurant = await restaurantModel.find();
  res.send({success:true,restaurant})
})

module.exports = router;
