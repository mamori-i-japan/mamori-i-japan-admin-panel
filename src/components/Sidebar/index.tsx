import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { Logo } from './style';
import config from './config';

const { Sider } = Layout;

interface SidebarProps {
  history?: History;
  sidebarIsCollapse: boolean;
  locale?: any;
}

export default ({ history, sidebarIsCollapse }: SidebarProps) => {
  return (
    <Sider collapsed={sidebarIsCollapse}>
      <Logo>Logo</Logo>
      <Menu defaultSelectedKeys={['0']} theme="dark" mode="inline">
        {config.map((item, index) => (
          <Menu.Item key={index}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
