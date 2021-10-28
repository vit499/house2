// const data = {
//   purchases: [
//     {
//       purchase: {
//         id: "3543545",
//         name: "ppp1",
//         price: 501,
//         freqId: 1,
//         needId: 3,
//         tags: ["mm", "qq", "ss"],
//       },
//     },
//     {
//       purchase: {
//         id: "34945495",
//         name: "ppp1",
//         price: 501,
//         freqId: 1,
//         needId: 3,
//         tags: ["mm", "qq", "ss"],
//       },
//     },
//   ],
//   totalCount: 100,
// };

// const pTags = [
//   "еда",
//   "жкх",
//   "лекарства",
//   "праздники",
//   "отдых",
//   "вино",
//   "хозтовары",
//   "стройка",
//   "дача",
//   "квартира",
// ];
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
];

const getTags = () => {
  let t = [];
  const cnt = getRandom(1, 4);
  for (let i = 0; i < cnt; i++) {
    const ind = getRandom(0, pTags.length - 1);
    if (ind !== i) t.push(pTags[ind].name);
  }
  if (t.length === 0) t.push(pTags[0].name);
  return t;
};
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const formData = () => {
  const purs = [];
  for (let i = 0; i < 500; i++) {
    const pur = {
      id: getRandom(1, 1000000).toString(),
      name: `p${getRandom(100, 200)}x`,
      price: getRandom(25, 15000),
      freqId: getRandom(1, 6),
      needId: getRandom(1, 6),
      tags: getTags(),
    };
    purs.push(pur);
  }
  return purs;
};

const getNeeds = () => {
  return [
    { id: 1, name: "a1", checked: false },
    { id: 2, name: "b2", checked: false },
    { id: 3, name: "c3", checked: false },
    { id: 4, name: "d4", checked: false },
    { id: 5, name: "e5", checked: false },
  ];
};

const getFreqs = () => {
  return [
    { id: 1, name: "неделя", checked: false },
    { id: 2, name: "месяц", checked: false },
    { id: 3, name: "квартал", checked: false },
    { id: 4, name: "год", checked: false },
    { id: 5, name: "разово", checked: false },
  ];
};

const Tags = () => {
  return pTags;
};

export { formData, Tags, getNeeds, getFreqs };
