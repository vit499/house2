import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./style.css";
import {
  ADDPUR_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PURLIST_ROUTE,
} from "../../utils/const";
import { Context } from "../..";

const TopBar = () => {
  const { userStore } = useContext(Context);
  const history = useHistory();

  const logout = (e) => {
    userStore.logout();
    history.push(LOGIN_ROUTE);
  };

  return (
    <>
      <div style={{ backgroundColor: "#87e8de" }}>
        <Menu
          mode="horizontal"
          className="container"
          style={{ backgroundColor: "#87e8de" }}
        >
          <Menu.Item
            key="home"
            icon={<HomeOutlined />}
            onClick={() => history.push(HOME_ROUTE)}
          >
            Главная
          </Menu.Item>

          <Menu.Item
            key="list"
            style={{ marginLeft: "auto" }}
            icon={<UnorderedListOutlined />}
            onClick={() => history.push(PURLIST_ROUTE)}
          >
            Список
          </Menu.Item>
          {userStore.isAuth && (
            <Menu.Item
              key="add"
              icon={<PlusCircleOutlined />}
              onClick={() => history.push(ADDPUR_ROUTE)}
            >
              Добавить
            </Menu.Item>
          )}
          {userStore.isAuth && (
            <Menu.Item
              key="admin"
              icon={<SettingOutlined />}
              onClick={() => history.push(ADMIN_ROUTE)}
            >
              Админ
            </Menu.Item>
          )}
          {!userStore.isAuth && (
            <Menu.Item
              key="login"
              icon={<LoginOutlined />}
              onClick={() => history.push(LOGIN_ROUTE)}
            >
              Войти
            </Menu.Item>
          )}
          {userStore.isAuth && (
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              onClick={logout}
            ></Menu.Item>
          )}
        </Menu>
      </div>
    </>
  );
};

export default TopBar;
