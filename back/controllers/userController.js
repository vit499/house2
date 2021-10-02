/* eslint-disable class-methods-use-this */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const ApiError = require("../error/ApiError");
const { secret } = require("../config/index");
const sequelize = require("../db");

const genJwt = (id, email, username, role) => {
  // console.log("sec", secret);
  const token = jwt.sign({ id, email, username, role }, secret, {
    expiresIn: "24h",
  });
  return token;
};

class UserController {
  async registration(req, res, next) {
    console.log("register", req.body);
    try {
      const { email, password, username } = req.body;
      // let { role } = req.body;
      if (!email || !password || !username) {
        return next(ApiError.badRequest("no email"));
      }
      const isExistEmail = await User.findOne({ where: { email } });
      if (isExistEmail) {
        return next(ApiError.badRequest("already exist"));
      }
      const countUsers = await User.count();
      // console.log("countUser", countUsers);
      const role = countUsers === 0 ? "ADMIN" : "USER";
      // if (!role) role = "USER";
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        email,
        password: hashPassword,
        username,
        role,
      });
      // const token = genJwt(user.id, email, role);
      const token = { token: "2211abcd" };
      return res.json({ token });
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }

  async login(req, res, next) {
    console.log("login", req.body);
    setTimeout(async () => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return next(ApiError.badRequest("no email"));
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return next(ApiError.badRequest("wrong email"));
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return next(ApiError.badRequest("wrong pass"));
        }
        const token = genJwt(user.id, user.email, user.username, user.role);
        return res.json({ token });
      } catch (err) {
        return next(ApiError.badRequest(err.message));
      }
    }, 2000);
  }

  async auth(req, res, next) {
    console.log("auth", req.user);
    setTimeout(() => {
      const { id, email, username, role } = req.user;
      if (!id) {
        return next(ApiError.badRequest("no id"));
      }
      const token = genJwt(id, email, username, role);
      return res.json({ token });
    }, 1000);
  }

  //
  async dropDb(req, res) {
    console.log("drop db");
    // await DropDb();
    await sequelize.drop();
    await sequelize.sync();
    const ans = { message: "drop ok" };
    return res.json(ans);
  }
}

module.exports = new UserController();
