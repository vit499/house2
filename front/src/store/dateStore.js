import { makeAutoObservable } from "mobx";
import moment from "moment";

class DateStore {
  constructor() {
    this._startDate = 0;
    this._endDate = 0;
    makeAutoObservable(this, {});
  }

  setDate(value, type) {
    const a = moment(value).startOf(type).format("x");
    const b = moment(value).endOf(type).format("x");
    //this.startDate = Number(a);
    //this.endDate = Number(b);
    console.log("start, end", a, b);
  }
  get startDay() {
    return this._startDay;
  }
  get endDay() {
    return this._endDay;
  }
}

const dateStore = new DateStore();

export default dateStore;
