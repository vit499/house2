import { makeAutoObservable } from "mobx";

export default class MarkStore {
  constructor() {
    this._freqs = [];
    this._needs = [];
    this._allTags = [];
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
}
