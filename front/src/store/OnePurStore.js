import { makeAutoObservable, runInAction } from "mobx";
import http from "../http";
import markStore from "./MarkStore";
import purStore from "./PurStore";

class OnePurStore {
  constructor() {
    this._load = "none";
    this._id = 0;
    this._name = "";
    this._price = 0;
    this._needId = 0;
    this._freqId = 0;
    this._tags = [];
    this._date = new Date().toISOString();
    this._allTags = [];
    makeAutoObservable(this, {});
  }

  // Init(pur = {id = 0, name = "", price = 0, needId = 1, freqId = 1, tags = [], date}) {
  Init(pur) {
    this._load = "none";
    this._id = pur.id ? pur.id : 0;
    this._name = pur.name ? pur.name : "";
    this._price = pur.price ? pur.price : 0;
    this._needId = pur.needId ? pur.needId : 1;
    this._freqId = pur.freqId ? pur.freqId : 1;
    this._tags = pur.tags && pur.tags.length ? pur.tags.split(" ") : [];
    this._date =
      pur.date && pur.date !== "" ? pur.date : new Date().toISOString();

    // console.log("init one pur", JSON.stringify(p, null, 2));
    // this._pur = p;
    const t1 = JSON.parse(JSON.stringify(markStore.tags));
    t1.forEach((t) => {
      if (this._tags.includes(t.name)) t.checked = true;
      else t.checked = false;
    });
    this._allTags = t1;
  }
  FindByName(name) {
    const pur = purStore.findByName(name);
    this.Init(pur);
  }
  setName(name) {
    // console.log("name", name);
    this._name = name;
  }
  setPrice(price) {
    this._price = price;
  }
  setNeedId(id) {
    this._needId = id;
  }
  setFreqId(id) {
    this._freqId = id;
  }
  setTag(id) {
    // id = Number(id);
    // console.log("set tag", id);
    this._allTags.forEach((t) => {
      if (t.id === id) {
        t.checked = !t.checked;
      }
    });
    const t1 = this._allTags.filter((t) => t.checked);
    const t2 = t1.map((t) => t.name);
    // console.log("t", t2);
    this._tags = t2;
  }
  setDate(date) {
    // if (!date) return;
    this._date = date && date !== "" ? date : new Date().toISOString(); // moment(date).toISOString();
  }

  get name() {
    return this._name;
  }
  get price() {
    return this._price;
  }
  get needId() {
    return this._needId;
  }
  get freqId() {
    return this._freqId;
  }
  get tags() {
    return this._tags;
  }
  get date() {
    return this._date;
  }
  get id() {
    return this._id;
  }
  get load() {
    return this._load;
  }

  getOnePur() {
    let p = {
      name: this._name,
      price: this._price,
      needId: this._needId,
      freqId: this._freqId,
      tags: this._tags.join(" "),
      date: this._date,
    };
    // if (this._id) p = { ...p, id: this._id };
    return p;
  }

  async createPur() {
    this._load = "load";
    const purchase = this.getOnePur();
    // console.log("create purchase", purchase);
    try {
      await http.Purchase.create(purchase);
      runInAction(() => {
        // console.log("get purs", purchases.data);
        this._load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this._load = "err";
      });
    }
  }

  async updatePur() {
    if (!this._id) return;
    this._load = "load";
    const purchase = this.getOnePur();
    try {
      await http.Purchase.update(this._id, purchase);
      runInAction(() => {
        // console.log("get pur", purchases.data);
        this._load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this._load = "err";
      });
    }
  }
  async deletePur() {
    if (!this._id) return;
    this._load = "load";
    // console.log("del purchase", this._id);
    try {
      await http.Purchase.delete(this._id);
      runInAction(() => {
        // console.log("get purs", purchases.data);
        this._load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this._load = "err";
      });
    }
  }
}

const onePurStore = new OnePurStore();

export default onePurStore;
