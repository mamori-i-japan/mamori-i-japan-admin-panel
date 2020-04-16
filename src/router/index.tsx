import React from 'react';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import ContactList from '../containers/ContactList';
import NoticeList from '../containers/NoticeList';
import PatientList from '../containers/PatientList';
import PatientDetail from '../containers/PatientDetail';
// import Register from '../containers/Register';
// import Top from '../containers/Top';
// import AdminUserList from '../containers/AdminUserList';
// import AdminUserDetail from '../containers/AdminUserDetail';

import { HOST } from '../constants';

const routes = [
  {
    path: HOST + 'login',
    component: Login,
  },
  // {
  //   path: HOST + 'join',
  //   component: Register,
  // },
  {
    path: HOST,
    component: Dashboard,
    auth: true,
    routes: [
      {
        path: HOST,
        exact: true,
        component: NoticeList,
      },
      {
        path: HOST + 'patients',
        exact: true,
        component: PatientList,
      },
      {
        path: HOST + 'patients/:id',
        exact: true,
        component: PatientDetail,
      },
      {
        path: HOST + 'contact',
        exact: true,
        component: ContactList,
      },
      // {
      //   path: HOST + 'users/:id',
      //   exact: true,
      //   component: AdminUserDetail,
      // },
      // {
      //   path: HOST + 'users',
      //   exact: true,
      //   component: AdminUserList,
      // },
    ],
  },
];

// TODO: move real auth logic to store  JST token?
export const fakeAuth = {
  isAuthenticated: process.env.NODE_ENV === 'development',
  authenticate(cb: any) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: any) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export const RouteWithSubRoutes: any = ({
  component: Component,
  auth,
  routes,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={(props) => {
      if (!auth || fakeAuth.isAuthenticated) {
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
