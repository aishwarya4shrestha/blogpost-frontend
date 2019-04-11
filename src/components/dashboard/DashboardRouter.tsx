import * as React from "react";
import { Route, Switch } from "react-router-dom";

import * as routes from "../../constants/routes";

import Dashboard from "./Dashboard";
import ProfileView from "./profile/ProfileView";
import Profile from "./profile";
import BlogDetailView from "./blogs/BlogDetailView";

const DashboardRouter = () => (
  <Switch>
    <Route exact={true} path={routes.DASHBOARD} component={Dashboard} />
    <Route path={"/profileView"} component={ProfileView} />
    <Route exact={true} path={routes.PROFILE} component={Profile} />
    <Route exact={true} path={routes.BLOGS_INFO} component={BlogDetailView} />
  </Switch>
);

export default DashboardRouter;

