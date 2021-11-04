import { makeAutoObservable, runInAction } from "mobx";
import jwtDecode from "jwt-decode";
// import { $host, $authHost } from "../http";
import http from "../http";

class UserStore {
  constructor() {
    this._isAuth = false;
    this._load = "none";
    this._loadApp = "none";
    this._user = { id: 1, email: "" };
    this._errors = null;
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }
  clrLoad() {
    this._load = "none";
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get load() {
    return this._load;
  }
  get loadApp() {
    return this._loadApp;
  }
  get errors() {
    return this._errors;
  }

  async auth() {
    this._loadApp = "load";
    this._errors = null;
    // console.log("app checkAuth start");
    try {
      const { data } = await http.User.auth();
      if (data) {
        // console.log("res auth", data);
        const u = await jwtDecode(data.token);
        await localStorage.setItem("token", data.token);

        runInAction(() => {
          // console.log("check auth data", u);
          this._user = u;
          this._isAuth = true;
          this._loadApp = "done";
        });
      }
    } catch (err) {
      runInAction(() => {
        if (err.response) {
          // this._errors = err.response.data;
        } // else console.log("auth err", err);
        this._loadApp = "done";
      });
    }
  }

  async register(email, password, username) {
    this._load = "load";
    this._errors = null;
    console.log("register start");
    try {
      const { data } = await http.User.register(email, password, username);
      runInAction(() => {
        if (data) {
          console.log("register res", data);
        }
        this._load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this._errors = err.response.data;
        this._load = "err";
      });
    }
  }

  async login(email, password) {
    this._load = "load";
    this._errors = null;
    console.log("login start");
    try {
      const { data } = await http.User.login(email, password);
      if (data) {
        const u = jwtDecode(data.token);
        localStorage.setItem("token", data.token);
        runInAction(() => {
          console.log("login res", data);
          this._user = u;
          this._isAuth = true;
          this._load = "done";
        });
      }
    } catch (err) {
      runInAction(() => {
        console.log("login err", err.response.data);
        this._errors = err.response.data;
        this._load = "err";
      });
    }
  }

  logout() {
    localStorage.removeItem("token");
    this._user = null;
    this._isAuth = false;
  }

  async dropDb() {
    try {
      console.log("[get] dropdb");
      const { data } = await http.User.dropDb();
      console.log("drop", data);
      return data;
    } catch (err) {
      // console.log("check auth err", err);
    }
  }
}

const userStore = new UserStore();

export default userStore;
