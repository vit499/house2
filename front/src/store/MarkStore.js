import { makeAutoObservable, runInAction } from "mobx";
import { $authHost, $host } from "../http/index";

export default class MarkStore {
  constructor() {
    this._freqs = [];
    this._needs = [];
    this._allTags = [];
    this._load = false;
    makeAutoObservable(this);
  }
  setFreqs(freqs) {
    this._freqs = freqs;
  }
  setNeeds(needs) {
    this._needs = needs;
  }
  setAllTags(allTags) {
    this._allTags = allTags;
  }

  get freqs() {
    return this._freqs;
  }
  get needs() {
    return this._needs;
  }
  get allTags() {
    return this._allTags;
  }
  get load() {
    return this._load;
  }

  // async fetchFreqs() {
  //   console.log("[get] fetchFreqs");
  //   const response = await $host.get("api/freq", {});
  //   const { data } = response;
  //   // console.log("f freqs", data);
  //   return data;
  // }
  // async fetchNeeds() {
  //   console.log("[get] fetchNeeds");
  //   const { data } = await $host.get("api/need", {});
  //   return data;
  // }
  // async fetchAllTags() {
  //   // console.log("[get] fetchAllTags");
  //   const { data } = await $host.get("api/tag", {});
  //   // console.log("get tags", data);
  //   return data;
  // }

  async fetchMark() {
    this._load = true;
    console.log("[get] fetchFreqs");
    try {
      const tags = await $host.get("api/tag", {});
      const needs = await $host.get("api/need", {});
      const freqs = await $host.get("api/freq", {});
      runInAction(() => {
        console.log("get tags", tags.data);
        console.log("get needs", needs.data);
        console.log("get freqs", freqs.data);
        this._allTags = tags.data;
        this._needs = needs.data;
        this._freqs = freqs.data;
        this._load = false;
      });
    } catch (e) {
      runInAction(() => {
        this._load = false;
      });
    }
  }
}
