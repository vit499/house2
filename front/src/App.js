import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { checkAuth } from "./http/userApi";
import Load from "./components/Load";
import { fetchAllTags, fetchFreqs, fetchNeeds } from "./http/purchaseApi";

const App = observer(() => {
  const { userStore, markStore } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);

  useEffect(() => {
    async function f() {
      console.log("app checkAuth start", new Date().getSeconds());
      try {
        const data = await checkAuth();
        if (data) {
          console.log("check auth data", data);
          userStore.setData(data);
          userStore.setIsAuth(true);
        }
      } catch (err) {}
      console.log("app checkAuth end", new Date().getSeconds());
      setLoading(false);
    }
    f();
  }, [userStore]);

  useEffect(() => {
    setLoad1(true);
    setLoad2(true);
    setLoad3(true);
    console.log("shop use effect1");
    fetchFreqs()
      .then((data) => {
        markStore.setFreqs(data);
        setLoad1(false);
      })
      .catch((e) => {});
    fetchNeeds()
      .then((data) => {
        markStore.setNeeds(data);
        setLoad2(false);
      })
      .catch((e) => {});
    fetchAllTags()
      .then((data) => {
        markStore.setAllTags(data);
        setLoad3(false);
      })
      .catch((e) => {});
  }, []);

  if (loading || load1 || load2 || load3) {
    return <Load />;
  }
  console.log("app isAuth", userStore.isAuth);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
