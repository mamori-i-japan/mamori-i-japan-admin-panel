import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { findIndex } from 'lodash';
import { Logo } from './style';
import config from './config';
import { langCode } from '../../constants';

const { Sider } = Layout;

interface SidebarProps {
  sidebarIsCollapse: boolean;
  locale?: any;
}

export default ({ sidebarIsCollapse }: any) => {
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState('');

  useEffect(() => {
    setSelectedKey('' + findIndex(config, { path: pathname }));
  }, [pathname]);

  return (
    <Sider collapsed={sidebarIsCollapse}>
      <Logo>Logo</Logo>
      <Menu selectedKeys={[selectedKey]} theme="dark" mode="inline">
        {config.map((item: any, index) => (
          <Menu.Item key={index}>
            <Link to={item.path}>
              <AppstoreOutlined />
              <span>{item[`name${langCode}`]}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
