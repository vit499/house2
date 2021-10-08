import { makeAutoObservable, runInAction } from "mobx";
import { checkAuth } from "../http/userApi";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._load = false;
    this._data = { id: 1, email: "" };
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setData(data) {
    this._data = data;
  }

  get isAuth() {
    return this._isAuth;
  }
  get data() {
    return this._data;
  }

  async auth() {
    this._load = true;
    console.log("app checkAuth start");
    try {
      const data = await checkAuth();
      runInAction(() => {
        if (data) {
          console.log("check auth data", data);
          this._data = data;
          this._isAuth = true;
        }
        this._load = false;
      });
    } catch (err) {
      runInAction(() => {
        this._load = false;
      });
    }
  }
}
