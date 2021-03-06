import React from "react";
import { useHistory } from "react-router";
import { Input } from "antd";
import { observer } from "mobx-react-lite";
import {
  ADDPUR_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PURLIST_ROUTE,
} from "../../utils/const";
import "./style.css";
import userStore from "../../store/UserStore";

const TopBar2 = observer(() => {
  const history = useHistory();

  const logout = (e) => {
    userStore.logout();
    history.push(LOGIN_ROUTE);
  };

  return (
    <div style={{ backgroundColor: "#20B2AA", minHeight: "4vh" }}>
      <div
        className="container"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <span className="topbar2-item" onClick={() => history.push(HOME_ROUTE)}>
          <span className="material-icons">house_siding</span>
          Главная
        </span>
        <Input
          placeholder="поиск"
          //onSearch={onSearch}
          bordered={false}
          style={{ width: 200, color: "#f0f0f0" }}
        />
        <span
          className="topbar2-item ms-auto"
          onClick={() => history.push(PURLIST_ROUTE)}
        >
          <span className="material-icons">list</span>
          Список
        </span>

        {userStore.isAuth && (
          <span
            className="topbar2-item"
            onClick={() => history.push(ADDPUR_ROUTE)}
          >
            <span className="material-icons">add_circle_outline</span>
            Добавить
          </span>
        )}
        {userStore.isAuth && (
          <span
            className="topbar2-item"
            onClick={() => history.push(ADMIN_ROUTE)}
          >
            <span className="material-icons"></span>
            Админ
          </span>
        )}
        {userStore.isAuth && (
          <span className="topbar2-item">{userStore.user.username}</span>
        )}
        {!userStore.isAuth && (
          <span
            className="topbar2-item"
            onClick={() => history.push(LOGIN_ROUTE)}
          >
            <span className="material-icons">login</span>
            Войти
          </span>
        )}
        {userStore.isAuth && (
          <span className="topbar2-item" onClick={logout}>
            <span className="material-icons">logout</span>
          </span>
        )}
      </div>
    </div>
  );
});

export default TopBar2;
