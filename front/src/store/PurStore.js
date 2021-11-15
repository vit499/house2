import { makeAutoObservable, runInAction } from "mobx";
import moment from "moment";
import http from "../http";
import dateStore from "./dateStore";

class PurStore {
  filterObject = {
    need: 0,
    freq: 0,
    tags: [],
  };
  constructor() {
    this._needReq = true;
    this._pursAll = []; // formData();
    this._purs = [];
    this._filterNeed = 0;
    this._filterFreq = 0;
    this._filterTags = [];
    this._load = "none";
    this._sum = 0;
    this._filterStartDay = 0;
    this._filterEndDay = 0;
    makeAutoObservable(this, {});
  }

  // www(str) {
  //   return (arr = ["q", "e", "r", "s"].every((e) => str.includes(e)));
  // }

  filterPurs() {
    // let cnt = 0;
    // console.log("filter, need, freq", this._filterNeed, this._filterFreq);
    const startDay = dateStore.startDay;
    const endDay = dateStore.endDay;
    // console.log("s,e", startDay, endDay);
    const p1 = this._pursAll.filter((p) => {
      // cnt++;
      // console.log("date", p.date);
      // console.log("date", moment(p.date).format("x"));
      const f0 = this._filterTags.length === 0;
      let f1 = true;
      if (!f0) {
        f1 = this._filterTags.every((t) => {
          // if (cnt < 10) {
          //   console.log("filterTags", cnt, t);
          //   const a = p.tags.includes(t);
          //   console.log("p.tags", p.tags, a);
          // }
          return p.tags.includes(t);
        });
      }
      const f2 = this._filterNeed === 0 || p.needId === this._filterNeed;
      const f3 = this._filterFreq === 0 || p.freqId === this._filterFreq;

      const d = Number(moment(p.date).format("x"));
      const f4 = !startDay || d >= startDay;
      const f5 = !endDay || d <= endDay;
      // console.log("f4, f5", f4, f5);
      const f6 = f4 && f5;
      return f1 && f2 && f3 && f6;
    });
    // cnt = 0;
    // for (let i = 0; i < 10; i++) {
    //   if (p1.lenght < i) break;
    //   console.log("p ", JSON.stringify(p1[i], null, 2));
    // }
    const sum = p1.reduce((acc, p) => acc + p.price, 0);

    this._purs = p1;
    this._sum = sum;
  }
  setFilters(need, freq, tags) {
    this._filterTags = tags;
    if (!need) need = 0;
    this._filterNeed = need;
    if (!freq) freq = 0;
    this._filterFreq = freq;
    this.filterPurs();
  }
  updFilters() {
    this.filterPurs();
  }
  get Purs() {
    return this._purs;
  }

  setStartDay(start, end) {
    this._filterStartDay = start;
    this._filterEndDay = end;
  }
  setNeedReq(en) {
    this._needReq = en;
  }
  get needReq() {
    return this._needReq;
  }
  get load() {
    return this._load;
  }
  get sum() {
    return this._sum;
  }

  filterHint(text) {
    let r = [];
    this._pursAll.forEach((p) => {
      if (p.name.indexOf(text) !== -1) r.push(p.name);
    });
    const r1 = Array.from(new Set(r));
    let r2 = [];
    for (let i = 0; i < r1.length; i++) {
      r2.push({ value: r1[i] });
    }
    return r2;
  }

  async fetchPurchases() {
    if (!this._needReq) return;
    this._load = "load";
    console.log("[get] fetchPurchases");
    try {
      const { data } = await http.Purchase.fetch();
      runInAction(() => {
        console.log("store purchases", data.count);
        this._pursAll = data.rows;
        this.filterPurs();
        //this._totalCount = data.count;
        this._needReq = false;
        this._load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this._load = "err";
      });
    }
  }
}

const purStore = new PurStore();

export default purStore;
