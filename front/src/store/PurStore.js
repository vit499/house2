import { flow, makeAutoObservable, runInAction } from "mobx";
import { $authHost } from "../http";
import { fetchOnePurchase } from "../http/purchaseApi";

export default class PurStore {
  load = "none";
  Pur = {
    name: "",
    price: 0,
    needId: 3,
    freqId: 1,
    tags: [],
  };
  constructor() {
    makeAutoObservable(this, {
      fetchPur: flow,
      updatePur: flow,
    });
  }

  initPur() {
    this.Pur.name = "";
    this.Pur.price = 0;
    this.Pur.needId = 3;
    this.Pur.freqId = 1;
    this.Pur.tags = [];
  }
  setName(name) {
    this.Pur.name = name;
  }
  get name() {
    return this.Pur.name;
  }
  setPrice(price) {
    this.Pur.price = price;
  }
  get price() {
    return this.Pur.price;
  }
  setNeedId(needId) {
    this.Pur.needId = needId;
  }
  get needId() {
    return this.Pur.needId;
  }
  setFreqId(freqId) {
    this.Pur.freqId = freqId;
  }
  get freqId() {
    return this.Pur.freqId;
  }
  setTags(tags) {
    this.Pur.tags = tags;
  }
  get tags() {
    return this.Pur.tags;
  }

  async createPur() {
    this.load = "load";
    console.log("create pur", this.Pur);
    const tags = this.Pur.tags.join(" ");
    const purchase = { ...this.Pur, tags: tags };
    console.log("create purchase", purchase);
    try {
      const purchases = await $authHost.post("api/purchase", purchase);
      runInAction(() => {
        console.log("get purs", purchases.data);
        this.load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this.load = "err";
      });
    }
  }
  *fetchPur(id) {
    this.initPur();
    this.load = "load";
    try {
      // Yield instead of await.
      const p = yield fetchOnePurchase(id);
      const pur = { ...p, tags: p.tags.split(" ") };
      this.load = "done";
      console.log("flow pur", pur);
      this.Pur = pur;
    } catch (error) {
      this.load = "err";
    }
  }
  *updatePur(id) {
    this.load = "load";
    console.log("update purchase", this.Pur);
    const tags = this.Pur.tags.join(" ");
    const purchase = { ...this.Pur, tags: tags };
    try {
      const purchases = yield $authHost.put(`api/purchase/${id}`, purchase);
      runInAction(() => {
        console.log("get pur", purchases.data);
        // this._needs = needs.data;
        this.load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this.load = "err";
      });
    }
  }
  async deletePur(id) {
    this.load = "load";
    console.log("del purchase", id);
    try {
      const purchases = await $authHost.delete(`api/purchase/${id}`);
      runInAction(() => {
        console.log("get purs", purchases.data);
        // this._needs = needs.data;
        this.load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this.load = "err";
      });
    }
  }
}
