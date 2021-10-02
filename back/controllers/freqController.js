/* eslint-disable class-methods-use-this */
const { Freq } = require("../models/models");
const ApiError = require("../error/ApiError");

class FreqController {
  async create(req, res, next) {
    // console.log("Freq", req.body);
    const { name } = req.body;
    if (!name) {
      return next(ApiError.badRequest("no name"));
    }
    const freq = await Freq.create({ name });
    return res.json(freq);
  }

  async getAll(req, res) {
    // console.log("get Freq", req.body);
    setTimeout(async () => {
      const freqs = await Freq.findAll();
      return res.json(freqs);
    }, 4000);
  }
}

module.exports = new FreqController();
