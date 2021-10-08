/* eslint-disable class-methods-use-this */
const { Need } = require("../models/models");
const ApiError = require("../error/ApiError");

class NeedController {
  // async create(req, res, next) {
  //   // console.log("Need", req.body);
  //   const { name } = req.body;
  //   if (!name) {
  //     return next(ApiError.badRequest("no name"));
  //   }
  //   const need = await Need.create({ name });
  //   return res.json(need);
  // }

  async create(req, res, next) {
    try {
      console.log("Need", req.body);
      const { name } = req.body;
      if (!name) {
        return next(ApiError.badRequest("no name"));
      }
      await Need.create({ name });
      const needs = await Need.findAll();
      return res.json(needs);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }

  async delete(req, res, next) {
    console.log("Need del", req.params);
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("no need id"));
      }
      await Need.destroy({
        where: {
          id,
        },
      });
      const needs = await Need.findAll();
      return res.json(needs);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
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
