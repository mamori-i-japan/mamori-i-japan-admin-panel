import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ActionFunctionAny } from 'redux-actions';
import { Action } from 'redux';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AppHeader } from './style';
import { I18nContext } from '../../locales';
import { fakeAuth } from '../../router';

interface HeaderProps {
  sidebarIsCollapse: boolean;
  toggleSidebarCollapse: ActionFunctionAny<Action<any>>;
}

export default ({ sidebarIsCollapse, toggleSidebarCollapse }: HeaderProps) => {
  let history = useHistory();
  const { translate } = useContext(I18nContext);

  const handleLogout = () => {
    return fakeAuth.authenticate(() => {
      history.replace('/login');
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
