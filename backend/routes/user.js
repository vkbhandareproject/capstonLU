const express = require("express");
const userModel = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
/////endpoint to create register resturant
router.post("/create", (req, res) => {
  let regBodydata = req.body;
  // console.log(regBodydata.data);

  bcryptjs.genSalt(10, (err, salt) => {
    // salt storing key
    if (!err) {
      bcryptjs.hash(regBodydata.password, salt, (err, newpass) => {
        if (!err) {
          regBodydata.password = newpass;

          userModel
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

// login part for user
router.post("/login", (req, res) => {
  let loginBodyData = req.body;

userModel
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
      res.status(404).send({ success: false, message: "email does not exist" });
    }
  })
  .catch((err) => {
    res.status().send("some err with the server", err);
    console.log("some err with the server", err);
  });
});
//endpoints to update user
router.put("/user/:user_id", (req, res) => {
  let user_id = req.params.req.id;
  let data = req.body;

  userModel
    .findByIdAndUpdate(user_id, data)
    .then((doc) => {
      res.send({ success: true, message: "User updated" });
    })
    .catch((err) => {
      console.log(err, "error in user update ");
      res.send({ success: false, message: "User Not Updated" });
    });
});
module.exports = router;
