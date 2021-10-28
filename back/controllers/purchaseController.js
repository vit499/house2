/* eslint-disable class-methods-use-this */

// const { Purchase } = require("../models/models");
const ApiError = require("../error/ApiError");
const purchaseService = require("../services/purchaseService");

class PurchaseController {
  async create(req, res, next) {
    // console.log("create Purchase", req.body);
    try {
      const purchase = purchaseService.savePurchase(req);

      return res.json(purchase);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    // console.log("get Purchase", req.query);
    setTimeout(async () => {
      try {
        const purchases = await purchaseService.getAll(req);
        return res.json(purchases);
      } catch (err) {
        return next(ApiError.badRequest(err.message));
      }
    }, 1000);
    // try {
    //   const purchases = await purchaseService.getAll(req);

    //   return res.json(purchases);
    // } catch (err) {
    //   return err;
    // }
  }

  async getOne(req, res, next) {
    // console.log("get one purchase");
    setTimeout(async () => {
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
    }, 1000);
  }

  async update(req, res, next) {
    // console.log("update purchase", req.body);
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("no purchase id"));
      }
      const purchase = purchaseService.updateOne(id, req);

      return res.json(purchase);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }

  async delete(req, res, next) {
    // console.log("delete purchase", req.params);
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("no purchase id"));
      }
      const purchase = purchaseService.deleteOne(id);

      return res.json(purchase);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new PurchaseController();
