import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ActionFunctionAny } from 'redux-actions';
import { Action } from 'redux';
import { Button, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AppHeader } from './style';
import { I18nContext } from '../../locales';

interface HeaderProps {
  sidebarIsCollapse: boolean;
  toggleSidebarCollapse: ActionFunctionAny<Action<any>>;
  logout: ActionFunctionAny<Action<any>>;
}

export default ({ sidebarIsCollapse, toggleSidebarCollapse, logout }: HeaderProps) => {
  const history = useHistory();
  const { translate } = useContext(I18nContext);

  const handleLogout = () => {
    logout();
    // TODO: locale
    message.success('Logout success!');
    history.replace('/');
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
