const jwt = require("jsonwebtoken");

let header = req.headers.authorization;

function verifyToken(req, res, next) {
  if (header !== undefined) {
    let token = header.split(" ")[1];
    jwt.verify(token, "secretkey", (err, data) => {
      if (!err) {
        next();
      } else {
        res.send({ message: "incorrect token login again" });
      }
    });
  } else {
    res.send({ message: "header is undefined,,token not found" });
  }
}
module.exports = verifyToken;
