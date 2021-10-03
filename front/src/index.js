import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserStore from "./store/UserStore";
import PurchaseStore from "./store/PurchaseStore";
import MarkStore from "./store/MarkStore";

const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      userStore: new UserStore(),
      markStore: new MarkStore(),
      purchaseStore: new PurchaseStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

export { Context };
