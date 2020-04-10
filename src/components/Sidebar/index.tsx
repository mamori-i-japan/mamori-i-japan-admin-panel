import React, { useContext } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { Logo } from './style';
import config from './config';

import { I18nContext } from '../../locales';

const { Sider } = Layout;

interface SidebarProps {
  sidebarIsCollapse: boolean;
  locale?: any;
}

export default (props: any, { sidebarIsCollapse }: any) => {
  const { langCode } = useContext(I18nContext);
  return (
    <Sider collapsed={sidebarIsCollapse}>
      <Logo>Logo</Logo>
      <Menu defaultSelectedKeys={['0']} theme="dark" mode="inline">
        {config.map((item: any, index) => (
          <Menu.Item key={index}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item[`${langCode}Name`]}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
