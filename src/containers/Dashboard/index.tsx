import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Alert } from 'antd';
import { Switch, RouteProps } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../router';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { toggleSidebarCollapseAction } from '../../redux/Sidebar/actions';
import { logoutAction } from '../../redux/Auth/actions';
import {
  closeErrorAlertAction,
  closeSuccessMessageAction,
} from '../../redux/Feedback/actions';

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

  const isSuccess = useSelector(({ feedback }: any) => feedback.isSuccess);
  const successMessage = useSelector(
    ({ feedback }: any) => feedback.successMessage
  );
  const isError = useSelector(({ feedback }: any) => feedback.isError);
  const errorMessage = useSelector(
    ({ feedback }: any) => feedback.errorMessage
  );

  const toggleSidebarCollapse = useCallback(
    () => dispatch(toggleSidebarCollapseAction()),
    [dispatch]
  );

  const onSuccessAlertClose = useCallback(() => dispatch(closeSuccessMessageAction()), [dispatch]);
  const onErrorAlertClose = useCallback(() => dispatch(closeErrorAlertAction()), [dispatch]);

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
      <div className="feedback-container">
        {isSuccess && (
          <Alert
            message={successMessage}
            type="success"
            banner
            closable
            onClose={onSuccessAlertClose}
          />
        )}
        {isError && (
          <Alert
            message={errorMessage}
            type="error"
            banner
            closable
            onClose={onErrorAlertClose}
          />
        )}
      </div>
    </PageLayout>
  );
};
