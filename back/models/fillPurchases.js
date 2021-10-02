const { Purchase } = require("./models");
const { fillTags } = require("./fillTags");

const createPurchase = async (name, price, needId, freqId, tags) => {
  const purchase = {
    name,
    price,
    needId,
    freqId,
    tags,
  };
  try {
    const p = await Purchase.create(purchase);
    // console.log("result save purchase", result);
  } catch (e) {
    console.log("err purchase", e);
  }
};

const createPurchases = async () => {
  await createPurchase("хлеб", 50, 1, 2, "еда");
  await createPurchase("рыба", 800, 1, 2, "еда праздник");
  await createPurchase("сметана", 50, 1, 2, "еда");
  await createPurchase("машина", 1500, 1, 2, "машина");
  await createPurchase("доски", 5000, 1, 2, "дача");
  await createPurchase("обед", 500, 1, 2, "еда Паша");
  await createPurchase("кварплата", 12000, 1, 2, "жкх");
  await createPurchase("цитрамон", 150, 1, 2, "лекарства");
  await createPurchase("водка", 500, 1, 2, "водка праздник");
};

const fillPurchases = async () => {
  await fillTags();
  await createPurchases();
};

module.exports = { fillPurchases };
