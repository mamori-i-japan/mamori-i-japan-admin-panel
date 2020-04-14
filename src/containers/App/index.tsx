import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store, history } from '../../redux/store';
import I18nContextProvider from '../../locales';
import PublicRoutes from '../../router';

import jaJP from 'antd/es/locale/ja_JP';

import './index.css';

export default () => {
  const locale = jaJP;

  return (
    <ConfigProvider locale={locale}>
      <I18nContextProvider lang={locale.locale}>
        <Provider store={store}>
          <PublicRoutes history={history} />
        </Provider>
      </I18nContextProvider>
    </ConfigProvider>
  );
};
