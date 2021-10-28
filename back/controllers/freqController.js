/* eslint-disable class-methods-use-this */
const { Freq } = require("../models/models");
const ApiError = require("../error/ApiError");

class FreqController {
  async create(req, res, next) {
    try {
      // console.log("Freq", req.body);
      const { name } = req.body;
      if (!name) {
        return next(ApiError.badRequest("no name"));
      }
      await Freq.create({ name });
      const freqs = await Freq.findAll();
      return res.json(freqs);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }

  async delete(req, res, next) {
    // console.log("Freq del", req.params);
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("no freq id"));
      }
      await Freq.destroy({
        where: {
          id,
        },
      });
      const freqs = await Freq.findAll();
      return res.json(freqs);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res) {
    // console.log("get Freq", req.body);
    setTimeout(async () => {
      const freqs = await Freq.findAll();
      return res.json(freqs);
    }, 1000);
  }
}

module.exports = new FreqController();
