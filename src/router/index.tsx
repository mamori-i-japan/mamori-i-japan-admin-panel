import React from 'react';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Login from '../containers/Login';

import Dashboard from '../containers/Dashboard';
import Top from '../containers/Top';
import RestaurantList from '../containers/RestaurantList';
import RestaurantDetail from '../containers/RestaurantDetail';

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
        component: Top,
      },
      {
        path: HOST + 'restaurant/:id',
        exact: true,
        component: RestaurantDetail,
      },
      {
        path: HOST + 'restaurant',
        exact: true,
        component: RestaurantList,
      },
    ],
  },
];

// TODO: move real auth logic to store  JST token?
export const fakeAuth = {
  isAuthenticated: true,
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
