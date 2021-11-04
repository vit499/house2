import { makeAutoObservable } from "mobx";
import moment from "moment";
import purStore from "./PurStore";

class DateStore {
  constructor() {
    this._startDate = 0;
    this._endDate = 0;
    makeAutoObservable(this, {});
  }

  setDate(value, type) {
    const a = moment(value).startOf(type).format("x");
    const b = moment(value).endOf(type).format("x");
    this._startDate = Number(a);
    this._endDate = Number(b);
    // console.log("start, end", a, b);
    purStore.updFilters();
  }
  get startDay() {
    return this._startDate;
  }
  get endDay() {
    return this._endDate;
  }
}

const dateStore = new DateStore();

export default dateStore;
