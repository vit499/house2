import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { Context } from "..";
import { register } from "../http/userApi";
import { LOGIN_ROUTE, HOME_ROUTE } from "../utils/const";

const Register = () => {
  const { user } = useContext(Context);
  const [username, setUsername] = useState("");
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

  const signUp = async (e) => {
    e.preventDefault();
    const emailCopy = email;
    const passCopy = password;
    setEmail("");
    setPassword("");
    setLoad(true);
    try {
      const response = await register(emailCopy, passCopy, username);
      console.log("singUp", response);
      setLoad(false);
      history.push(LOGIN_ROUTE);
    } catch (e) {
      if (e.response) alert(e.response.data.message);
      setLoad(false);
    }
  };

  if (user.isAuth) {
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
        <h3 className="m-auto">Регистрация</h3>
        <Form className="d-flex flex-column" onSubmit={signUp}>
          <Form.Control
            className="mt-3"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
              >
                Зарегистрироваться
              </Button>
            </Col>
            <Col xs={12} className="mt-3">
              Есть аккаунт?{" "}
              <NavLink to={LOGIN_ROUTE} className="mt-3">
                Войти
              </NavLink>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
