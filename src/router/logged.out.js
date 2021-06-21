import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
import routes from "../routes";
import Auth from "../screens/Auth";
import NotFound from "../screens/NotFound";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.home} exact>
          <Layout>
            <Auth />
          </Layout>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
