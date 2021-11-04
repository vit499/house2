import { makeAutoObservable, runInAction } from "mobx";
import http from "../http";
// import useLocalStorage from '../hooks/useLocalStorage'

class MarkStore {
  constructor(purStore) {
    this._load = "none";
    this._tags = []; // Tags();
    this._freqs = []; // getFreqs();
    this._needs = []; // getNeeds();
    this._filter = {
      freqs: this._freqs,
      needs: this._needs,
      tags: this._tags,
    };
    // this.Init(purStore);
    makeAutoObservable(this, {});
  }
  get tags() {
    return this._tags;
  }
  get needs() {
    return this._needs;
  }
  get freqs() {
    return this._freqs;
  }

  InitLocal() {
    // const f1 = localStorage.getItem("filter");
    // if (f1) {
    //   this._filter = JSON.parse(f1);
    //   this._tags = this._filter.tags;
    //   this._freqs = this._filter.freqs;
    //   this._needs = this._filter.needs;
    //   return true;
    // }
    // return false;
  }
  Init(purStore) {
    //if (this.InitLocal()) {
    this.updatePurStore(purStore);
    //}
  }
  getTags(ind) {
    let tags = "";
    this._purs[ind].tags.map((t) => {
      return tags.concat(` t `);
    });
    return tags;
  }

  updatePurStore(purStore) {
    let idNeed, idFreq;
    let tags = [];
    this._tags.forEach((t) => {
      if (t.checked) tags.push(t.name);
    });
    const need = this._needs.find((t) => t.checked);
    if (!need) idNeed = 0;
    else idNeed = need.id;
    const freq = this._freqs.find((t) => t.checked);
    if (!freq) idFreq = 0;
    else idFreq = freq.id;
    // purStore.setFilterTags(tags);
    // purStore.setFilterNeed(idNeed);
    // purStore.setFilterFreq(idFreq);
    console.log("need, freq, tags", idNeed, idFreq, tags);
    purStore.setFilters(idNeed, idFreq, tags);
  }
  setCheckTag(id, purStore) {
    const tt = this._tags.map((t) => {
      if (t.id === id) t.checked = !t.checked;
      // console.log("t", JSON.stringify(t, null, 2));
      return t;
      // return t.id === id ? { ...t, checked: !t.checked } : t;
    });
    this._tags = tt;
    this._filter = { ...this._filter, tags: this._tags };
    localStorage.setItem("filter", JSON.stringify(this._filter));
    // let f = [];
    // this._tags.forEach((t) => {
    //   if (t.checked) f.push(t.name);
    // });
    this.updatePurStore(purStore);
  }

  setCheckNeed(id1, purStore) {
    let id = Number(id1);
    // let id0 = id;
    // console.log("t", id);
    this._needs.forEach((t) => {
      if (t.id === id) {
        if (t.checked) {
          t.checked = false;
          // id0 = 0;
        } else t.checked = true;
      } else t.checked = false;
    });
    this._filter = { ...this._filter, needs: this._needs };
    localStorage.setItem("filter", JSON.stringify(this._filter));

    this.updatePurStore(purStore);
  }
  setCheckFreq(id1, purStore) {
    let id = Number(id1);
    // let id0 = id;
    // console.log("t", id);
    this._freqs.forEach((t) => {
      if (t.id === id) {
        if (t.checked) {
          t.checked = false;
          // id0 = 0;
        } else t.checked = true;
      } else t.checked = false;
    });
    this._filter = { ...this._filter, freqs: this._freqs };
    localStorage.setItem("filter", JSON.stringify(this._filter));
    this.updatePurStore(purStore);
  }

  async fetchMark() {
    this._load = "load";
    // console.log("[get] fetchFreqs");
    try {
      const { data } = await http.Mark.fetch();
      runInAction(() => {
        // console.log("get tags", data.tags);
        this._tags = data.tags;
        this._needs = data.needs;
        this._freqs = data.freqs;
        // this.InitLocal();
        this._load = "done";
      });
    } catch (e) {
      runInAction(() => {
        this._load = "err";
      });
    }
  }
  async createTag(tag) {
    this._load = "load";
    // console.log("[get] fetchFreqs");
    try {
      const { data } = await http.Mark.createTag(tag);
      runInAction(() => {
        console.log("create tags", data);
        this._load = "done";
      });
    } catch (e) {
      runInAction(() => {
        this._load = "err";
      });
    }
  }
}

export default MarkStore;
