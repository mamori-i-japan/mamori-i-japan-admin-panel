import React from 'react';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard'
import MessageList from '../containers/MessageList';
import AdminUserList from '../containers/AdminUserList';
import AdminUserDetail from '../containers/AdminUserDetail';
import OrganizationList from '../containers/OrganizationList';
import OrganizationDetail from '../containers/OrganizationList';
import { store } from '../redux/store';

import { HOST } from '../constants';

const routes = [
  {
    path: HOST + 'login',
    component: Login,
  },
  {
    path: HOST,
    component: Dashboard,
    auth: true,
    routes: [
      {
        path: HOST,
        exact: true,
        component: MessageList,
      },
      {
        path: HOST + 'users/:id',
        exact: true,
        component: AdminUserDetail,
      },
      {
        path: HOST + 'users',
        exact: true,
        component: AdminUserList,
      },
      {
        path: HOST + 'organizations/:id',
        exact: true,
        component: OrganizationDetail,
      },
      {
        path: HOST + 'organizations',
        exact: true,
        component: OrganizationList,
      },
    ],
  },
];

export const RouteWithSubRoutes = ({
  component: Component,
  auth,
  routes,
  ...rest
}: any) => (
    <Route
      {...rest}
      render={(props) => {
        if (!auth || store.getState().auth.token) {
          // pass the sub-routes down to keep nesting
          return <Component {...props} routes={routes} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    ></Route>
  );

export default ({ history }: any) => {
  /* place ConnectedRouter under Provider */
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {routes.map((route: RouteProps, index: number) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </Switch>
    </ConnectedRouter>
  );
};
