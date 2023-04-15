const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const adminModel = require("../models/admin");
const restaurantModel = require("../models/restaurant");
const router = express.Router();

function selectmodel(role) {
  if (role === "admin") {
    console.log("New user added in admin db");
    return adminModel; //adminModel from models/admin
  } else if (role === "restaurant") {
    console.log("New user added in restaurant db");
    return restaurantModel;
  } else {
    console.log("New user added in user in db");
    return userModel;
  }
}

router.post("/register", (req, res) => {
  let regBodydata = req.body;
  // console.log(regBodydata.data);

  let model = selectmodel(regBodydata.role);

  bcryptjs.genSalt(10, (err, salt) => {
    // salt storing key
    if (!err) {
      bcryptjs.hash(regBodydata.password, salt, (err, newpass) => {
        if (!err) {
          regBodydata.password = newpass;
          delete regBodydata.role;

          model
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
  let model = selectmodel(loginBodyData.role);

  model
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

module.exports = router;
