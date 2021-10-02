import { $authHost, $host } from "./index";

const createFreq = async (freq) => {
  try {
    // console.log('createFreq');
    const { data } = await $authHost.post("api/freq", freq);
    return data;
  } catch (err) {}
};

// const fetchFreqs = async () => {
//   const { data } = await $host.get("api/freq", {});
//   return data;
// };

const fetchFreqs = async () => {
  console.log("[get] fetchFreqs");
  try {
    const response = await $host.get("api/freq", {});
    const { data } = response;
    // console.log("f freqs", data);
    return data;
  } catch (error) {
    // console.log(error);
  }
};

const createNeed = async (need) => {
  const { data } = await $authHost.post("api/need", need);
  return data;
};

const fetchNeeds = async () => {
  console.log("[get] fetchNeeds");
  const { data } = await $host.get("api/need", {});
  return data;
};

const createTag = async (tag) => {
  const { data } = await $authHost.post("api/tag", tag);
  return data;
};

const fetchAllTags = async () => {
  console.log("[get] fetchAllTags");
  const { data } = await $host.get("api/tag", {});
  console.log("get tags", data);
  return data;
};

const createPurchase = async (purchase) => {
  const { data } = await $authHost.post("api/purchase", purchase);
  return data;
};

const fetchPurchases = async (freqId, needId, page, limit) => {
  console.log("[get] fetchPurchases");
  try {
    const { data } = await $host.get("api/purchase", {
      params: {
        freqId,
        needId,
        page,
        limit,
      },
    });
    return data;
  } catch (err) {}
};

const fetchOnePurchase = async (id) => {
  console.log("[get] fetchOnePurchase");
  try {
    const { data } = await $host.get(`api/purchase/${id}`, {});
    console.log("one", data);
    return data;
  } catch (err) {}
};

export {
  createFreq,
  fetchFreqs,
  createNeed,
  fetchNeeds,
  createTag,
  fetchAllTags,
  createPurchase,
  fetchPurchases,
  fetchOnePurchase,
};
