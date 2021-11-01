import { makeAutoObservable, runInAction } from "mobx";
import http from "../http";

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
    //this.filterPurs();
    makeAutoObservable(this, {});
  }

  // www(str) {
  //   return (arr = ["q", "e", "r", "s"].every((e) => str.includes(e)));
  // }

  filterPurs() {
    // let cnt = 0;
    // console.log("filter, need, freq", this._filterNeed, this._filterFreq);
    const p1 = this._pursAll.filter((p) => {
      // cnt++;
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
      return f1 && f2 && f3;
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
  // setFilterTags(tags) {
  //   this._filterTags = tags;
  //   this.filterPurs();
  // }
  // setFilterNeed(id) {
  //   if (!id) id = 0;
  //   this._filterNeed = id;
  //   this.filterPurs();
  // }
  // setFilterFreq(id) {
  //   if (!id) id = 0;
  //   this._filterFreq = id;
  //   this.filterPurs();
  // }
  setFilters(need, freq, tags) {
    this._filterTags = tags;
    if (!need) need = 0;
    this._filterNeed = need;
    if (!freq) freq = 0;
    this._filterFreq = freq;
    this.filterPurs();
  }
  get Purs() {
    return this._purs;
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

  async fetchPurchases(freqId, needId, page, limit) {
    this._load = "load";
    console.log("[get] fetchPurchases");
    try {
      const { data } = await http.Purchase.fetch(freqId, needId);
      runInAction(() => {
        console.log("store purchases", data.count);
        this._pursAll = data.rows;
        this.filterPurs();
        //this._totalCount = data.count;
        this._load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this._load = "err";
      });
    }
  }
}

export default PurStore;
