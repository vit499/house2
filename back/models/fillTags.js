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
    await Need.create({ name: "1" });
    await Need.create({ name: "2" });
    await Need.create({ name: "3" });
    await Need.create({ name: "4" });
    await Need.create({ name: "5" });
  } catch (e) {
    console.log("err tag", e);
  }
};
const createFreqs = async () => {
  try {
    await Freq.create({ name: "день" });
    await Freq.create({ name: "неделя" });
    await Freq.create({ name: "месяц" });
    await Freq.create({ name: "год" });
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
