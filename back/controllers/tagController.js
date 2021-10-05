/* eslint-disable class-methods-use-this */
const { Tag } = require("../models/models");
const ApiError = require("../error/ApiError");

class TagController {
  async create(req, res, next) {
    // console.log("Tag", req.body);
    const { name } = req.body;
    if (!name) {
      return next(ApiError.badRequest("no name"));
    }
    const tag = await Tag.create({ name });
    return res.json(tag);
  }

  async getAll(req, res) {
    // console.log("get Tag", req.body);
    setTimeout(async () => {
      const tags = await Tag.findAll();
      return res.json(tags);
    }, 1000);
  }
}

module.exports = new TagController();
