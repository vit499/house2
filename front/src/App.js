import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from ".";
// import { checkAuth } from "./http/userApi";
import Load from "./components/Load";
// import { fetchAllTags, fetchFreqs, fetchNeeds } from "./http/purchaseApi";

const App = observer(() => {
  const { userStore, markStore } = useContext(Context);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect app userStore");
    userStore.auth();
  }, [userStore]);

  useEffect(() => {
    console.log("useEffect app markStore");
    markStore.fetchMark();
  }, [markStore]);

  if (userStore.load || markStore.load) {
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
