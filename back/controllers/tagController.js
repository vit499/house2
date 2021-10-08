/* eslint-disable class-methods-use-this */
const { Tag } = require("../models/models");
const ApiError = require("../error/ApiError");

class TagController {
  // async create(req, res, next) {
  //   // console.log("Tag", req.body);
  //   const { name } = req.body;
  //   if (!name) {
  //     return next(ApiError.badRequest("no name"));
  //   }
  //   const tag = await Tag.create({ name });
  //   return res.json(tag);
  // }

  async create(req, res, next) {
    try {
      console.log("Tag", req.body);
      const { name } = req.body;
      if (!name) {
        return next(ApiError.badRequest("no name"));
      }
      await Tag.create({ name });
      const tags = await Tag.findAll();
      return res.json(tags);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }

  async delete(req, res, next) {
    console.log("Tag del", req.params);
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("no tag id"));
      }
      await Tag.destroy({
        where: {
          id,
        },
      });
      const tags = await Tag.findAll();
      return res.json(tags);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
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
