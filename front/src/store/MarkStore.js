import { makeAutoObservable, runInAction } from "mobx";
import { $authHost, $host } from "../http/index";

export default class MarkStore {
  constructor() {
    this._freqs = [];
    this._needs = [];
    this._tags = [];
    this._load = false;
    makeAutoObservable(this);
  }
  setFreqs(freqs) {
    this._freqs = freqs;
  }
  setNeeds(needs) {
    this._needs = needs;
  }
  setAllTags(tags) {
    this._tags = tags;
  }

  get freqs() {
    return this._freqs;
  }
  get needs() {
    return this._needs;
  }
  get tags() {
    return this._tags;
  }
  get load() {
    return this._load;
  }

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
        this._tags = tags.data;
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
  async createFreq(freq) {
    this._load = true;
    console.log("createFreq", freq);
    try {
      const freqs = await $authHost.post("api/freq", freq);
      runInAction(() => {
        console.log("get freqs", freqs.data);
        this._freqs = freqs.data;
        this._load = false;
      });
    } catch (err) {
      runInAction(() => {
        this._load = false;
      });
    }
  }
  async delFreq(id) {
    this._load = true;
    console.log("delFreq", id);
    try {
      const freqs = await $authHost.delete(`api/freq/${id}`);
      runInAction(() => {
        console.log("get freqs", freqs.data);
        this._freqs = freqs.data;
        this._load = false;
      });
    } catch (err) {
      runInAction(() => {
        this._load = false;
      });
    }
  }

  async createTag(tag) {
    this._load = true;
    console.log("createTag", tag);
    try {
      const tags = await $authHost.post("api/tag", tag);
      runInAction(() => {
        console.log("get tags", tags.data);
        this._tags = tags.data;
        this._load = false;
      });
    } catch (err) {
      runInAction(() => {
        this._load = false;
      });
    }
  }
  async delTag(id) {
    this._load = true;
    console.log("delTag", id);
    try {
      const tags = await $authHost.delete(`api/tag/${id}`);
      runInAction(() => {
        console.log("get tags", tags.data);
        this._tags = tags.data;
        this._load = false;
      });
    } catch (err) {
      runInAction(() => {
        this._load = false;
      });
    }
  }

  async fetchFreqs() {
    console.log("[get] fetchFreqs");
    const response = await $host.get("api/freq", {});
    const { data } = response;
    // console.log("f freqs", data);
    return data;
  }
}
