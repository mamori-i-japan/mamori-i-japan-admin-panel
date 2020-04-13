import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AppHeader } from './style';
import { ActionFunctionAny } from 'redux-actions';
import { Action } from 'redux';

interface HeaderProps {
  sidebarIsCollapse: boolean;
  toggleSidebarCollapse: ActionFunctionAny<Action<any>>;
}

export default ({ sidebarIsCollapse, toggleSidebarCollapse }: HeaderProps) => {
  return (
    <AppHeader>
      <div className="trigger" onClick={toggleSidebarCollapse}>
        {!sidebarIsCollapse && <MenuFoldOutlined />}
        {sidebarIsCollapse && <MenuUnfoldOutlined />}
      </div>
    </AppHeader>
  );
};
