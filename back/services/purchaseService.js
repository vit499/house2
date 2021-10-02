/* eslint-disable class-methods-use-this */
const { Purchase } = require("../models/models");
const ApiError = require("../error/ApiError");
const PurchaseDto = require("../dto/purchaseDto");

const getTagArr = (tagStr) => {
  const tagArr = tagStr.split(" ");
  return tagArr;
};

class PurchaseService {
  async savePurchase(req) {
    const { name, price, needId, freqId, tagList } = req;

    const tags = getTagArr(tagList);
    const purchase = { name, price, needId, freqId, tags };

    try {
      const p = await Purchase.create(purchase);
      const pp = new PurchaseDto(p);
      // console.log("result save purchase", result);
      return pp;
    } catch (e) {
      console.log("err purchase", e);
      throw ApiError.BadRequest(e);
    }
  }

  async getAll(req) {
    let purchases;

    const { needId, freqId } = req.query;
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    const offset = page * limit - limit;

    if (!needId && !freqId) {
      purchases = await Purchase.findAndCountAll({ limit, offset });
    } else if (needId && !freqId) {
      purchases = await Purchase.findAndCountAll({
        where: { needId },
        limit,
        offset,
      });
    } else if (!needId && freqId) {
      purchases = await Purchase.findAndCountAll({
        where: { freqId },
        limit,
        offset,
      });
    } else {
      purchases = await Purchase.findAndCountAll({
        where: { needId, freqId },
        limit,
        offset,
      });
    }

    console.log(": ", purchases);
    return purchases;
  }
}

module.exports = new PurchaseService();
