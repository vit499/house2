import { makeAutoObservable } from "mobx";

export default class PurchaseStore {
  constructor() {
    this._freqs = [];
    this._needs = [];
    this._purchases = [];
    this._allTags = [];
    this._tags = [{}];
    this._selectedFreqId = 0;
    this._selectedNeedId = 0;
    this._page = 1;
    this._totalCount = 0;
    this._limit = 2;
    makeAutoObservable(this);
  }

  setFreqs(freqs) {
    this._freqs = freqs;
  }

  setNeeds(needs) {
    this._needs = needs;
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
  setAllTags(allTags) {
    this._allTags = allTags;

    // console.log("obj of tags", this._tags);
  }
  setTagEn(tagId, en) {
    this._tags[tagId].en = en;
  }
  setTags(tags) {
    this._tags = tags;
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

  get freqs() {
    return this._freqs;
  }
  get needs() {
    return this._needs;
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
  get allTags() {
    return this._allTags;
  }
  get tags() {
    return this._tags;
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
}
