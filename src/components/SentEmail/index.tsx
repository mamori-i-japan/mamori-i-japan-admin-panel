import React, { useContext } from 'react';
import { Result } from 'antd';
import { I18nContext } from '../../locales';


export default () => {
  const { translate } = useContext(I18nContext);

  return (
    <Result
      status="success"
      title={translate('emailHasBeenSent')}
      style={{
        paddingTop: 120
      }}
      subTitle={translate('loginByAuthLink')}
    />
  );
};
