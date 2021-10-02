/* eslint-disable class-methods-use-this */
// const { Purchase } = require("../models/models");

class PurchaseDto {
  name;
  price;
  freqId;
  needId;
  tags;

  constructor(model) {
    this.name = model.name;
    this.price = model.price;
    this.freqId = model.freqId;
    this.needId = model.needId;
    this.tags = model.tagStr.join(" ");
  }
}

module.exports = PurchaseDto;
