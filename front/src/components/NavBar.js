import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  ADD_PURCHASE_ROUTE,
} from "../utils/const";
import { BoxArrowRight } from "react-bootstrap-icons";

const NavBar = observer(() => {
  const { userStore } = useContext(Context);
  const history = useHistory();

  const signOut = () => {
    localStorage.removeItem("token");
    userStore.setData({});
    userStore.setIsAuth(false);
    // history.push(LOGIN_ROUTE);
  };

  console.log("nav isAuth", userStore.isAuth);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink to={HOME_ROUTE} style={{ color: "white" }}>
          Список
        </NavLink>
        <NavLink
          to={ADD_PURCHASE_ROUTE}
          style={{ color: "white" }}
          className="ml-2"
        >
          Добавить
        </NavLink>
        <Nav className="ml-auto">
          {userStore.data && (
            <>
              <div className="mr-2 mt-1">
                <h5 style={{ color: "lightGray" }}>
                  {userStore.data.username}
                </h5>
              </div>
            </>
          )}
          {userStore.data && userStore.data.role === "ADMIN" && (
            <>
              <Button
                variant="outline-light"
                className="mr-2"
                onClick={() => history.push(ADMIN_ROUTE)}
              >
                Admin
              </Button>
            </>
          )}
          {userStore.isAuth ? (
            <>
              <div style={{ cursor: "pointer" }} onClick={() => signOut()}>
                <BoxArrowRight
                  color="LightGray"
                  size={32}
                  className="ml-2 mt-1"
                />
              </div>
            </>
          ) : (
            <>
              <Button
                variant="outline-light"
                onClick={() => history.push(LOGIN_ROUTE)}
              >
                Войти
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
