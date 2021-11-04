import { observer } from "mobx-react-lite";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { HOME_ROUTE } from "../utils/const";
import userStore from "../store/UserStore";

const AppRouter = observer(() => {
  // console.log("isAuth", userStore.isAuth);
  return (
    <Switch>
      {userStore.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={HOME_ROUTE} />
    </Switch>
  );
});

export default AppRouter;
