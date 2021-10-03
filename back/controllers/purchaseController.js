/* eslint-disable class-methods-use-this */

// const { Purchase } = require("../models/models");
const ApiError = require("../error/ApiError");
const purchaseService = require("../services/purchaseService");

class PurchaseController {
  async create(req, res, next) {
    console.log("Purchase", req.body);
    try {
      const purchaseSaved = purchaseService.savePurchase(req, next);

      return res.json(purchaseSaved);
    } catch (err) {
      return err;
    }
  }

  async getAll(req, res, next) {
    console.log("get Purchase", req.query);
    try {
      const purchases = await purchaseService.getAll(req);

      return res.json(purchases);
    } catch (err) {
      return err;
    }
  }

  async getOne(req, res, next) {
    console.log("get one purchase");
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("no purchase id"));
      }
      const purchase = await purchaseService.getOne(id);
      return res.json(purchase);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new PurchaseController();
