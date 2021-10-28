const { Tag, Need, Freq } = require("./models");

const pTags = [
  { id: "1", name: "еда", checked: false },
  { id: "2", name: "жкх", checked: false },
  { id: "3", name: "лекарства", checked: false },
  { id: "4", name: "праздники", checked: false },
  { id: "5", name: "отдых", checked: false },
  { id: "6", name: "вино", checked: false },
  { id: "7", name: "хозтовары", checked: false },
  { id: "8", name: "стройка", checked: false },
  { id: "9", name: "дача", checked: false },
  { id: "10", name: "квартира", checked: false },
  { id: "11", name: "Неман", checked: false },
  { id: "12", name: "работа", checked: false },
  { id: "13", name: "хобби", checked: false },
  { id: "14", name: "учеба", checked: false },
  { id: "15", name: "Саша", checked: false },
  { id: "16", name: "Паша", checked: false },
  { id: "17", name: "машина", checked: false },
  { id: "18", name: "бензин", checked: false },
];

const createTag = async (ind) => {
  try {
    await Tag.create({ name: `${ind}` });
  } catch (e) {
    console.log("err tag", e);
  }
};
const createTags = async () => {
  for (let i = 0; i < pTags.length; i += 1) {
    const t = pTags[i];
    await createTag(t.name);
  }
  // await createTag("еда");
  // await createTag("машина");
  // await createTag("дача");
  // await createTag("жкх");
  // await createTag("школа");
  // await createTag("праздник");
  // await createTag("лекарства");
  // await createTag("водка");
};

const createNeeds = async () => {
  try {
    await Need.create({ name: "a1" });
    await Need.create({ name: "b2" });
    await Need.create({ name: "c3" });
    await Need.create({ name: "d4" });
    await Need.create({ name: "e5" });
  } catch (e) {
    console.log("err tag", e);
  }
};
const createFreqs = async () => {
  try {
    // await Freq.create({ name: "день" });
    await Freq.create({ name: "неделя" });
    await Freq.create({ name: "месяц" });
    await Freq.create({ name: "квартал" });
    await Freq.create({ name: "год" });
    await Freq.create({ name: "разово" });
  } catch (e) {
    console.log("err tag", e);
  }
};

const fillTags = async () => {
  await createNeeds();
  await createFreqs();
  await createTags();
};
// const Tags = () => {
//   return pTags;
// };

const checkEmpty = async () => {
  const countTags = await Tag.count();
  if (!countTags) {
    await fillTags();
  }
};

module.exports = { fillTags, pTags, checkEmpty };
