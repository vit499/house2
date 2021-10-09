import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserStore from "./store/UserStore";
import PurchaseStore from "./store/PurchaseStore";
import MarkStore from "./store/MarkStore";
import PurStore from "./store/PurStore";

const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      userStore: new UserStore(),
      markStore: new MarkStore(),
      purchaseStore: new PurchaseStore(),
      purStore: new PurStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

export { Context };
