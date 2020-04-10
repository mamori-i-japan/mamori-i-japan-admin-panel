import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Layout } from 'antd';
import { Logo } from './style';
import config from './config';

import { I18nContext } from '../../locales';

const { Sider } = Layout;

interface SidebarProps {
  sidebarIsCollapse: boolean;
  locale?: any;
}

export default ({ sidebarIsCollapse }: any) => {
  const { langCode } = useContext(I18nContext);
  const [selectedKey, setSelectedKey] = useState('0');

  return (
    <Sider collapsed={sidebarIsCollapse}>
      <Logo>Logo</Logo>
      {/* TODO: change '0' to a sdynamic key in sotre */}
      <Menu selectedKeys={[selectedKey]} theme="dark" mode="inline">
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
