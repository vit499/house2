import { Button, Input, Form, Col, Row, Typography } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import Errors from "../components/Errors";
// import Load from "../components/Load";
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/const";
import userStore from "../store/UserStore";

const RegisterPage = observer(() => {
  // const history = useHistory();
  const [values, setValues] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = (values) => {
    console.log("submit:", values);
    // const { email, password, username } = values;
    // userStore.register(email, password, username);
    setValues(values);
    setIsSubmit(true);
    // history.push(LOGIN_ROUTE);
  };

  useEffect(() => {
    if (!isSubmit) return;

    const { email, password, username } = values;
    userStore.register(email, password, username);
    setIsSubmit(false);
  }, [isSubmit, values]);
  useEffect(() => {
    console.log("reg clrLoad");
    userStore.clrLoad();
  }, []);

  if (userStore.isAuth) {
    return <Redirect to={HOME_ROUTE} />;
  }
  if (userStore.load === "done") {
    return <Redirect to={LOGIN_ROUTE} />;
  }

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
            Регистрация
          </Typography.Title>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            style={{ margin: "1rem" }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Введите имя!",
                },
              ]}
            >
              <Input placeholder="Имя" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Введите email!",
                },
              ]}
            >
              <Input placeholder="Почта" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Введите пароль!",
                },
              ]}
            >
              <Input.Password placeholder="Пароль" />
            </Form.Item>

            <Row style={{ justifyContent: "center" }}>
              <Col
              // style={{ backgroundColor: "aqua" }}
              >
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={userStore.load === "load"}
                  >
                    Зарегистрироваться
                  </Button>
                </Form.Item>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
});

export default RegisterPage;
