const { Tag, Need, Freq } = require("./models");

const createTag = async (ind) => {
  try {
    await Tag.create({ name: `${ind}` });
  } catch (e) {
    console.log("err tag", e);
  }
};
const createTags = async () => {
  await createTag("еда");
  await createTag("машина");
  await createTag("дача");
  await createTag("жкх");
  await createTag("школа");
  await createTag("праздник");
  await createTag("лекарства");
  await createTag("водка");
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

module.exports = { fillTags };
