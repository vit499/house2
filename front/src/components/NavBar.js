import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { ADMIN_ROUTE, LOGIN_ROUTE, HOME_ROUTE } from "../utils/const";
import { BoxArrowRight } from "react-bootstrap-icons";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

  const signOut = () => {
    localStorage.removeItem("token");
    user.setData({});
    user.setIsAuth(false);
    // history.push(LOGIN_ROUTE);
  };

  console.log("nav isAuth", user.isAuth);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink to={HOME_ROUTE} style={{ color: "white" }}>
          Магазин
        </NavLink>
        <Nav className="ml-auto">
          {user.data && (
            <>
              <div className="mr-2 mt-1">
                <h5 style={{ color: "lightGray" }}>{user.data.username}</h5>
              </div>
            </>
          )}
          {user.data && user.data.role === "ADMIN" && (
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
          {user.isAuth ? (
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
