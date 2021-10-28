import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./bootstrap.css";
import App from "./App";
import PurStore from "./store/PurStore";
import MarkStore from "./store/MarkStore";
import UserStore from "./store/UserStore";
import OnePurStore from "./store/OnePurStore";

const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      purStore: new PurStore(),
      markStore: new MarkStore(),
      userStore: new UserStore(),
      onePurStore: new OnePurStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

export { Context };
