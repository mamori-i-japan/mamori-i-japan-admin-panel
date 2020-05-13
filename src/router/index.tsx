import React from 'react';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import MessageList from '../containers/MessageList';
import AdminUserList from '../containers/AdminUserList';
import AdminUserDetail from '../containers/AdminUserDetail';
// import OrganizationList from '../containers/OrganizationList';
// import OrganizationDetail from '../containers/OrganizationDetail';
import { store } from '../redux/store';
import accessPermission from '../constants/accessPermission';
import NoMatch from '../components/NoMatch';
import { HOST } from '../constants';
import { redirectDefaultPath } from '../constants/accessPermission';

const routes = [
  {
    path: HOST + 'login',
    component: Login,
    authLoggedIn: true,
  },
  {
    path: HOST,
    component: Dashboard,
    auth: true,
    routes: [
      {
        path: HOST + 'prefectures',
        exact: true,
        component: MessageList,
        permission: 'accessPrefecture',
      },
      {
        path: HOST + 'users/:id',
        exact: true,
        component: AdminUserDetail,
        permission: 'accessAdminUser',
      },
      {
        path: HOST,
        exact: true,
        component: AdminUserList,
        permission: 'accessAdminUser',
      },
      // {
      //   path: HOST + 'organizations/:id',
      //   exact: true,
      //   component: OrganizationDetail,
      //   permission: 'accessOrganization',
      // },
      // {
      //   path: HOST + 'organizations',
      //   exact: true,
      //   component: OrganizationList,
      //   permission: 'accessOrganization',
      // },
      {
        path: '*',
        component: NoMatch,
      },
    ],
  },
];

export const RouteWithSubRoutes = ({
  component: Component,
  auth,
  authLoggedIn,
  permission,
  routes,
  ...rest
}: any) => (
    <Route
      {...rest}
      render={(props) => {
        if (!permission || accessPermission[permission]()) {
          if (authLoggedIn && store.getState().auth.token) {
            return <Redirect to={redirectDefaultPath()} />;
          }

          if (!auth || store.getState().auth.token) {
            // pass the sub-routes down to keep nesting
            return <Component {...props} routes={routes} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: HOST + 'login',
                  state: { from: props.location },
                }}
              />
            );
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: HOST + 'no-result',
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

        <Route path="/404">
          <NoMatch />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
};
