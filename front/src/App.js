import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { checkAuth } from "./http/userApi";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const wrapperStyle = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  useEffect(() => {
    async function f() {
      console.log("app checkAuth start", new Date().getSeconds());
      try {
        const data = await checkAuth();
        if (data) {
          console.log("check auth data", data);
          user.setData(data);
          user.setIsAuth(true);
        }
      } catch (err) {}
      console.log("app checkAuth end", new Date().getSeconds());
      setLoading(false);
    }
    f();
  }, [user]);

  console.log("app isAuth", user.isAuth);
  if (loading) {
    return (
      <div style={wrapperStyle}>
        <Spinner animation="border" variant="primary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
