import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Load from "./components/Load";
import TopBar from "./components/TopBar/TopBar";
import markStore from "./store/MarkStore";
import userStore from "./store/UserStore";
import React from "react";

const App = observer(() => {
  useEffect(() => {
    console.log("app init");
    markStore.Init();
    markStore.fetchMark();
  }, []);

  useEffect(() => {
    // console.log("useEffect app userStore");
    userStore.auth();
  }, []);

  // useEffect(() => {
  //   // console.log("useEffect app markStore");
  //   markStore.fetchMark();
  // }, []);

  if (userStore.loadApp === "load" || markStore.load === "load") {
    return <Load />;
  }
  // console.log("app isAuth", userStore.isAuth);
  return (
    <BrowserRouter>
      <TopBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
