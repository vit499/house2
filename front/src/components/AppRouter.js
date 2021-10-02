import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Context } from "..";
import { authRoutes, publicRoutes } from "../routes";
import { HOME_ROUTE } from "../utils/const";

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  // console.log("user", user);
  return (
    <Switch>
      {user.isAuth &&
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
