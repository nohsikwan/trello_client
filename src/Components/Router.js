import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Board from "../Routes/Board";

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Board} />
  </>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth} />
  </>
);

const AppRouter = ({ isLoggedIn }) => (
  <Router>
    <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
  </Router>
);

export default AppRouter;
