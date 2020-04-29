import React, { useContext } from 'react';
import { ActionFunctionAny } from 'redux-actions';
import { Action } from 'redux';
import { Button, Modal } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { AppHeader } from './style';
import { I18nContext } from '../../locales';

const { confirm } = Modal;

interface HeaderProps {
  sidebarIsCollapse: boolean;
  toggleSidebarCollapse: ActionFunctionAny<Action<any>>;
  logout: ActionFunctionAny<Action<any>>;
}

export default ({ sidebarIsCollapse, toggleSidebarCollapse, logout }: HeaderProps) => {
  const { translate } = useContext(I18nContext);

  const handleLogout = async () => {
    confirm({
      title: translate('logoutConfirmTitle'),
      icon: <ExclamationCircleOutlined />,
      okText: translate('logout'),
      onOk() {
        logout();
      },
    });
  };

  return (
    <AppHeader>
      <div className="trigger" onClick={toggleSidebarCollapse}>
        {sidebarIsCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      <div className="action-board">
        <Button type="link" onClick={handleLogout}>
          {translate('logout')}
        </Button>
      </div>
    </AppHeader>
  );
};
