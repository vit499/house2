import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import FooterComp from "./components/FooterComp";
import Load from "./components/Load";
import TopBar2 from "./components/TopBar/TopBar2";

const App = observer(() => {
  const { markStore, purStore, userStore } = useContext(Context);

  useEffect(() => {
    console.log("app init");
    markStore.Init(purStore);
  }, [markStore, purStore]);

  useEffect(() => {
    console.log("useEffect app userStore");
    userStore.auth();
  }, [userStore]);

  useEffect(() => {
    console.log("useEffect app markStore");
    markStore.fetchMark();
  }, [markStore]);

  if (userStore.loadApp === "load" || markStore.load === "load") {
    return <Load />;
  }
  console.log("app isAuth", userStore.isAuth);
  return (
    <BrowserRouter>
      <TopBar2 />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
