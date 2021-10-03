import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { Context } from "..";
import { login } from "../http/userApi";
import { REGISTER_ROUTE, HOME_ROUTE } from "../utils/const";

const Login = observer(() => {
  const { userStore } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const history = useHistory();

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

  const signIn = async (e) => {
    console.log("signIn");
    e.preventDefault();
    setLoad(true);
    console.log("email", email);
    const emailCopy = email;
    const passCopy = password;
    // setEmail("");
    // setPassword("");
    try {
      const data = await login(emailCopy, passCopy);
      console.log("signIn data", data);
      setLoad(false);
      setEmail("");
      setPassword("");
      if (data) {
        userStore.setData(data);
        userStore.setIsAuth(true);
        history.push(HOME_ROUTE);
      }
    } catch (e) {
      if (e.response) alert(e.response.data.message);
      setLoad(false);
    }
  };

  if (userStore.isAuth) {
    return <Redirect to={HOME_ROUTE} />;
  }
  if (load) {
    return (
      <div style={wrapperStyle}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 200 }}
    >
      <Card style={{ width: 400 }} className="p-5 text-center">
        <h3 className="m-auto">Вход</h3>
        <Form className="d-flex flex-column" onSubmit={signIn}>
          <Form.Control
            className="mt-3"
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row>
            <Col xs={12}>
              <Button
                variant="outline-success"
                className="mt-3 w-100"
                type="submit"
                disabled={load}
              >
                Войти
              </Button>
            </Col>
            <Col className="mt-3">
              Нет аккаунта?{" "}
              <NavLink to={REGISTER_ROUTE} className="mt-3">
                Регистрация
              </NavLink>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Login;
