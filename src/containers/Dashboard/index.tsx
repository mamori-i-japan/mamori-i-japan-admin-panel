import React, { useCallback } from 'react';
import { Layout } from 'antd';
import { Switch, RouteProps } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { PageLayout } from './style';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../redux/Sidebar/actionTypes';

const { Content } = Layout;

export interface ContainerProps {
  routes?: any;
  locale?: any;
}

export default (props: any) => {
  const { routes } = props;

  const dispatch = useDispatch();
  const sidebarIsCollapse = useSelector(
    (store: any) => store.sidebar.isCollapse
  );

  const toggleSidebarCollapse = useCallback(
    () => dispatch({ type: actionTypes.TOGGLE_SIDEBAR_COLLAPSE }),
    [dispatch]
  );

  return (
    <PageLayout>
      <Sidebar sidebarIsCollapse={sidebarIsCollapse} />

      <Layout>
        <Header
          sidebarIsCollapse={sidebarIsCollapse}
          toggleSidebarCollapse={toggleSidebarCollapse}
        />

        <Content>
          <Switch>
            {routes &&
              routes.map((route: RouteProps, index: number) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))}
          </Switch>
        </Content>

        <Footer />
      </Layout>
    </PageLayout>
  );
};
