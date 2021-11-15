import { makeAutoObservable } from "mobx";
import moment from "moment";
import purStore from "./PurStore";

class DateStore {
  constructor() {
    this._startDate = 0;
    this._endDate = 0;
    this._date = new Date();
    this._type = "week";
    makeAutoObservable(this, {});
  }

  setDate(value, type) {
    this._date = value;
    this._type = type;
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
  get date() {
    return this._date;
  }
  get type() {
    return this._type;
  }
}

const dateStore = new DateStore();

export default dateStore;
