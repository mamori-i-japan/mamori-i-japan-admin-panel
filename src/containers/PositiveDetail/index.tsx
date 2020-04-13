import React, { useContext } from 'react';
import { Button } from 'antd';
import { I18nContext } from '../../locales';
import { ContentContainer, DetailForm } from '../../components/CommonStyles';
import FormField from '../../components/FormField';

import dataMap from './dataMap';

export default () => {
  const { translate } = useContext(I18nContext);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <ContentContainer>
      <DetailForm
        name="positive form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {dataMap &&
          dataMap.map((item: any) => (
            <FormField key={item.name} field={item} />
          ))}

        <DetailForm.Item>
          <Button type="primary" htmlType="submit">
            {translate('submit')}
          </Button>
        </DetailForm.Item>
      </DetailForm>
    </ContentContainer>
  );
};
