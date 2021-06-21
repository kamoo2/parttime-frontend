import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
import routes from "../routes";
import EditProfile from "../screens/EditProfile";
import Home from "../screens/Home";
import NotFound from "../screens/NotFound";
import Profile from "../screens/Profile";
import CreateStore from "../screens/store/CreateStore";
import DetailStore from "../screens/store/DetailStore";
import ManageStore from "../screens/store/ManageStore";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.home} exact>
          <Layout>
            <Home />
          </Layout>
        </Route>
        <Route path={routes.storeView} exact>
          <Layout>
            <DetailStore />
          </Layout>
        </Route>
        <Route path={routes.storeAdd} exact>
          <Layout>
            <CreateStore />
          </Layout>
        </Route>
        <Route path={routes.profile} exact>
          <Layout>
            <Profile />
          </Layout>
        </Route>
        <Route path={routes.manageStore} exact>
          <Layout>
            <ManageStore />
          </Layout>
        </Route>
        <Route path={routes.editProfile} exact>
          <Layout>
            <EditProfile />
          </Layout>
        </Route>
        <Route>
          <Layout>
            <NotFound />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};
