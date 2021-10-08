import { makeAutoObservable, runInAction } from "mobx";
import { $authHost, $host } from "../http/index";

export default class PurchaseStore {
  // _load = false;
  constructor() {
    this._purchases = [];
    this._selectedFreqId = 0;
    this._selectedNeedId = 0;

    this._page = 1;
    this._totalCount = 0;
    this._limit = 2;
    this._load = false;
    this._reqPurchase = true;
    makeAutoObservable(this);
  }

  setPurchases(purchases) {
    this._purchases = purchases;
  }
  setSelectedFreqId(selectedFreqId) {
    this._page = 1;
    this._selectedFreqId = selectedFreqId;
  }
  setSelectedNeedId(selectedNeedId) {
    this._page = 1;
    this._selectedNeedId = selectedNeedId;
  }
  setReqPurchase(en) {
    this._reqPurchase = en;
  }

  get purchases() {
    return this._purchases;
  }
  get selectedFreqId() {
    return this._selectedFreqId;
  }
  get selectedNeedId() {
    return this._selectedNeedId;
  }
  get reqPurchase() {
    return this._reqPurchase;
  }

  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setLimit(limit) {
    this._limit = limit;
  }
  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
  get load() {
    return this._load;
  }

  async fetchPurchases(freqId, needId, page, limit) {
    this._load = true;
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
      runInAction(() => {
        console.log("store purchases", data.count);
        // this.setPurchases(data.rows);
        // this.setTotalCount(data.count);
        this._purchases = data.rows;
        this._totalCount = data.count;
        this._load = false;
      });
    } catch (err) {
      runInAction(() => {
        this._load = false;
      });
    }
  }

  async createNeed(need) {
    this._load = true;
    console.log("createNeed", need);
    try {
      const needs = await $authHost.post("api/need", need);
      runInAction(() => {
        console.log("get needs", needs.data);
        this._needs = needs.data;
        this._load = false;
      });
    } catch (err) {
      runInAction(() => {
        this._load = false;
      });
    }
  }
  async createPurchase(p) {
    this._load = true;
    console.log("create purchase", p);
    const tags = p.tags.join(" ");
    const purchase = { ...p, tags: tags };
    console.log("create purchase", p);
    try {
      const purchases = await $authHost.post("api/purchase", purchase);
      runInAction(() => {
        console.log("get purs", purchases.data);
        // this._needs = needs.data;
        this._load = false;
      });
    } catch (err) {
      runInAction(() => {
        this._load = false;
      });
    }
  }
  async updatePurchase(purchase, id) {
    this._load = true;
    console.log("update purchase", purchase);
    try {
      const purchases = await $authHost.put(`api/purchase/${id}`, purchase);
      runInAction(() => {
        console.log("get pur", purchases.data);
        // this._needs = needs.data;
        this._load = false;
      });
    } catch (err) {
      runInAction(() => {
        this._load = false;
      });
    }
  }
  async delPurchase(id) {
    this._load = true;
    console.log("del purchase", id);
    try {
      const purchases = await $authHost.delete(`api/purchase/${id}`);
      runInAction(() => {
        console.log("get purs", purchases.data);
        // this._needs = needs.data;
        this._load = false;
      });
    } catch (err) {
      runInAction(() => {
        this._load = false;
      });
    }
  }
}
