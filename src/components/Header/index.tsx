import React from 'react';
import { Icon } from 'antd';
import { AppHeader } from './style';

interface HeaderProps {
  sidebarIsCollapse: boolean,
  toggleSidebarCollapse: () => { type: string; }
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
  )
}
