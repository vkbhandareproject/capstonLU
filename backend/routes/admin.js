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

          adminModel
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
                      message: "Some Token issue there",
                    });
                  }
                }
              );
            } else {
              res.status(401).send({
                err: "Password Not Matched",
                message: "Wrong Password, try again",
              });
            }
          }
        );
      } else {
        res
          .status(404)
          .send({ success: false, message: "Please Enter Login Details" });
      }
    })
    .catch((err) => {
      res.status().send("some err with the server", err);
      console.log("some err with the server", err);
    });
});

module.exports = router;
