import { makeAutoObservable } from "mobx";

export default class PurchaseStore {
  constructor() {
    this._purchases = [];
    this._selectedFreqId = 0;
    this._selectedNeedId = 0;

    this._page = 1;
    this._totalCount = 0;
    this._limit = 2;
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

  get purchases() {
    return this._purchases;
  }
  get selectedFreqId() {
    return this._selectedFreqId;
  }
  get selectedNeedId() {
    return this._selectedNeedId;
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
}
