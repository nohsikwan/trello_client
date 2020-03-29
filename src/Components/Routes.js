import React, { useContext } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Board from "../Routes/Boards";
import EditProfile from "../Routes/EditProfile";
import Search from "../Routes/Search";
import Containers from "../Routes/Containers";
import Store from "../store";

const LoggedInRoutes = ({ name }) => (
  <Switch>
    <Route exact path="/" render={() => <Board />} />
    <Route
      path={`/${localStorage.getItem("name")}`}
      render={() => <EditProfile />}
    />
    <Route path="/:container" render={() => <Containers />} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => {
  return <>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</>;
};
export default AppRouter;
