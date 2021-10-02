const jwt = require("jsonwebtoken");
const { secret } = require("../config/index");
const { User } = require("../models/models");

const checkRole = (role) => {
  return async function (req, res, next) {
    // console.log("c", req.headers);
    // console.log("c", secret);
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const authHeader = req.headers.authorization;
      // console.log("header", authHeader);
      if (!authHeader) {
        return res.status(401).json({ message: "no token" });
      }
      const token = authHeader.split(" ")[1];
      // console.log("token", token);
      if (!token) {
        return res.status(401).json({ message: "no token" });
      }
      const decodedUser = jwt.verify(token, secret);
      const { email } = decodedUser;
      if (!email) {
        return res.status(401).json({ message: "no email" });
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "no user" });
      }
      // console.log("decoded", decodedUser);
      if (decodedUser.role !== role) {
        return res.status(403).json({ message: "no admin" });
      }
      req.user = decodedUser;
      next();
    } catch (err) {
      return res.status(401).json({ message: "err: no auth" });
    }
  };
};

// const checkRole = (role) => {
//   return async function (req, res, next) {
//     try {
//       const email = "aaa";
//       const user = await User.findOne({ where: { email } });
//       if (!user) {
//         return res.status(401).json({ message: "no user" });
//       }
//       if (user.role !== role) {
//         return res.status(403).json({ message: "no admin" });
//       }
//       req.user = user;
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: "err: no auth" });
//     }
//   };
// };

module.exports = checkRole;
