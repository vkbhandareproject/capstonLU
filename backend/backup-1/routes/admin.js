const express = require("express");
const adminModel = require("../models/admin");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcryptjs = require("bcryptjs");
//routes / endpoints to create/register a admin
router.post("/create", (req, res) => {
  let regBodydata = req.body;
  // console.log(regBodydata.data);

  bcryptjs.genSalt(10, (err, salt) => {
    // salt storing key
    if (!err) {
      bcryptjs.hash(regBodydata.password, salt, (err, newpass) => {
        if (!err) {
          regBodydata.password = newpass;
          //   delete regBodydata.role;

          model
            .create(regBodydata)
            .then((doc) => {
              res.send({
                success: true,
                message: "Admin Created successfully",
              });
            })
            .catch((err) => {
              console.log(err);
              res.send({
                success: false,
                message: "Error in admin creation",
              });
            });
        } else {
          console.log(err);
          res.send({ success: false, message: "Not registered admin" });
        }
      });
    }
  });
});

// login endpoint for admin
// login part for user
router.post("/login", (req, res) => {
  let loginBodyData = req.body;

  adminModel
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
                    res.send({
                      success: true,
                      token: token,
                      email: loginUserData.email,
                      userid: loginUserData._id,
                    });
                  } else {
                    res.send({ message: "Some issue there" });
                  }
                }
              );
            }
          }
        );
      } else {
        res.send({ success: false, message: "email does not exist" });
      }
    })
    .catch((err) => {
      res.send("some err", err);
      console.log("some err", err);
    });
});

//routes / endpoints to update/approve a restaurant

router.put("/approverestaurant/restaurand_id", (req, res) => {
  let restaurant_id = req.params.restaurant_id;
  let data = req.body;

  restaurantModel
    .updateOne({ _id: restaurant_id }, data)
    .then((info) => {
      // console.log("info");
      res.send({ message: "restaurant approved " });
    })
    .catch((err) => {
      console.log("error", err);
      res.send({ message: "Error in update restaurant approve " });
    });
});
module.exports = router;
