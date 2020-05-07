import React, { useContext } from 'react';
import { Result } from 'antd';
import { I18nContext } from '../../locales';


export default () => {
  const { translate } = useContext(I18nContext);

  return (
    <Result
      status="404"
      title="404"
      style={{
        paddingTop: 120
      }}
      subTitle={translate('pageIsNotFound')}
    />
  );
};
