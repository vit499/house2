const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const { secret } = require("../config/index");

const authMiddleware = async (req, res, next) => {
  setTimeout(async () => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "no token" });
      }
      const token = authHeader.split(" ")[1];
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
      req.user = decodedUser;
      next();
    } catch (err) {
      return res.status(401).json({ message: "no auth" });
    }
  }, 2000);
};

module.exports = authMiddleware;
