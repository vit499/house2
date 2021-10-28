const { Purchase } = require("./models");
const { fillTags, pTags } = require("./fillTags");

// const pTags = [
//   { id: "1", name: "еда", checked: false },
//   { id: "2", name: "жкх", checked: false },
//   { id: "3", name: "лекарства", checked: false },
//   { id: "4", name: "праздники", checked: false },
//   { id: "5", name: "отдых", checked: false },
//   { id: "6", name: "вино", checked: false },
//   { id: "7", name: "хозтовары", checked: false },
//   { id: "8", name: "стройка", checked: false },
//   { id: "9", name: "дача", checked: false },
//   { id: "10", name: "квартира", checked: false },
// ];

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getTags = () => {
  let t = [];
  const cnt = getRandom(1, 4);
  for (let i = 0; i < cnt; i += 1) {
    const ind = getRandom(0, pTags.length - 1);
    if (ind !== i) t.push(pTags[ind].name);
  }
  if (t.length === 0) t.push(pTags[0].name);
  const strT = t.join(" ");
  return strT;
};

const createPur = async (purchase) => {
  try {
    const p = await Purchase.create(purchase);
    // console.log("result save purchase", result);
  } catch (e) {
    console.log("err purchase", e);
  }
};

const createPurs = async () => {
  for (let i = 0; i < 200; i += 1) {
    const pur = {
      // id: getRandom(1, 1000000).toString(),
      name: `p${getRandom(100, 200)}x`,
      price: getRandom(25, 15000),
      freqId: getRandom(1, 6),
      needId: getRandom(1, 6),
      tags: getTags(),
    };
    await createPur(pur);
  }
};

const fillPurs = async () => {
  await fillTags();
  await createPurs();
};

module.exports = { fillPurs };
