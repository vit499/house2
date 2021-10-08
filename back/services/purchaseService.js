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
    const { name, price, needId, freqId, tags } = req.body;

    const p1 = { name, price, needId, freqId, tags };

    const p2 = await Purchase.create(p1);

    console.log("p2", JSON.stringify(p2, null, 2));
    console.log("p2", p2.rows[0]);
    return p2;
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

    // console.log(": ", purchases);
    return purchases;
  }

  async getOne(id) {
    const purchase = await Purchase.findOne({
      where: { id },
    });
    // const purchase = new PurchaseDto(p);
    console.log("one p: ", JSON.stringify(purchase, null, 2));
    return purchase;
  }

  async updateOne(req) {
    const { id, name, price, needId, freqId, tags } = req.body;
    const p1 = { name, price, needId, freqId, tags };
    console.log("p1", JSON.stringify(p1, null, 2));

    // const p2 = await Purchase.findOne({ where: { id } });
    // const p3 = { ...p2, ...p1 };

    const p3 = await Purchase.update(
      { name, price, needId, freqId, tags },
      {
        where: {
          id,
        },
      }
    );

    console.log("p3", JSON.stringify(p3, null, 2));
    console.log("p3", p3.rows[0]);
    return p3;
  }

  async deleteOne(id) {
    const delRows = await Purchase.destroy({
      where: {
        id,
      },
    });
    console.log("cnt rows del", delRows);
    return { del: delRows };
  }
}

module.exports = new PurchaseService();
