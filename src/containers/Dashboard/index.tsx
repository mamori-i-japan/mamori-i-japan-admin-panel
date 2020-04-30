import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import { Switch, RouteProps } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { toggleSidebarCollapseAction } from '../../redux/Sidebar/actions';
import { logoutAction } from '../../redux/Auth/actions';

import { PageLayout } from './style';

const { Content } = Layout;

export interface ContainerProps {
  routes?: any;
  locale?: any;
}

export default (props: ContainerProps) => {
  const { routes } = props;
  const dispatch = useDispatch();

  const sidebarIsCollapse = useSelector(
    ({ sidebar }: any) => sidebar.isCollapse
  );

  const toggleSidebarCollapse = useCallback(
    () => dispatch(toggleSidebarCollapseAction()),
    [dispatch]
  );

  const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);

  return (
    <PageLayout>
      <Sidebar sidebarIsCollapse={sidebarIsCollapse} />

      <Layout>
        <Header
          sidebarIsCollapse={sidebarIsCollapse}
          toggleSidebarCollapse={toggleSidebarCollapse}
          logout={logout}
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
