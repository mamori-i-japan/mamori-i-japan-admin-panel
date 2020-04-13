import React from 'react';
import Icon from '@ant-design/icons';
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
      <Icon
        className="trigger"
        type={sidebarIsCollapse ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleSidebarCollapse}
      />
    </AppHeader>
  );
};
