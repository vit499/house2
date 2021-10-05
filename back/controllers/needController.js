/* eslint-disable class-methods-use-this */
const { Need } = require("../models/models");
const ApiError = require("../error/ApiError");

class NeedController {
  async create(req, res, next) {
    // console.log("Need", req.body);
    const { name } = req.body;
    if (!name) {
      return next(ApiError.badRequest("no name"));
    }
    const need = await Need.create({ name });
    return res.json(need);
  }

  async getAll(req, res) {
    // console.log("get Need", req.body);
    setTimeout(async () => {
      const needs = await Need.findAll();
      return res.json(needs);
    }, 1000);
  }
}

module.exports = new NeedController();
