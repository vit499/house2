import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
// import Checkbox from "antd/lib/checkbox/Checkbox";
import { NavLink, Redirect } from "react-router-dom";
import { HOME_ROUTE, REGISTER_ROUTE } from "../utils/const";
// import Load from "../components/Load";
import { observer } from "mobx-react-lite";
import Errors from "../components/Errors";
import userStore from "../store/UserStore";

const LoginPage = observer(() => {
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = (values) => {
    // console.log("Success:", values);
    // setValues(values);
    setIsSubmit(true);
    // const { username, email, password } = values;
    // userStore.login(email, password, username);
  };

  useEffect(() => {
    if (!isSubmit) return;
    // const { username, email, password } = values;
    userStore.login(email, password);
    setIsSubmit(false);
  }, [isSubmit, email, password]);
  useEffect(() => {
    // console.log("login clrLoad");
    userStore.clrLoad();
  }, []);

  if (userStore.isAuth) {
    return <Redirect to={HOME_ROUTE} />;
  }
  // if (userStore.load === "done") {
  //   return <Redirect to={HOME_ROUTE} />;
  // }

  return (
    <div style={{ margin: "2rem 1rem 1rem 1rem" }}>
      {userStore.errors && <Errors />}
      <Row>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 8, offset: 8 }}
          style={{ border: "1px solid #91d5ff" }}
        >
          <Typography.Title
            level={3}
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Вход
          </Typography.Title>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            style={{ margin: "1rem" }}
          >
            <Input
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />

            <Input.Password
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />

            <Row style={{ justifyContent: "center" }}>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "100%",
                    }}
                    loading={userStore.load === "load"}
                  >
                    Войти
                  </Button>
                </Form.Item>
                Нет аккаунта?{" "}
                <NavLink to={REGISTER_ROUTE} className="mt-3">
                  Зарегистрироваться
                </NavLink>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
});

export default LoginPage;
