import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Typography } from 'antd';
import { fakeAuth } from '../../router';
import FormField from '../../components/FormField';
import { I18nContext } from '../../locales';

import { LoginContainer } from './style';

import dataMap from './dataMap';

const { Title } = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 8 },
};

export default () => {
  let history = useHistory();
  let localtion = useLocation();
  const { translate } = useContext(I18nContext);

  let { from }: any = localtion.state || { from: { pathname: '/' } };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    return fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <LoginContainer>
      <Title level={3}>{translate('loginTitle')}</Title>
      <Form
        {...layout}
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {dataMap &&
          dataMap.map((item: any) => (
            <FormField key={item.name} field={item} />
          ))}

        <Form.Item {...tailLayout}>
          <Button block type="primary" htmlType="submit">
            {translate('loginSubmit')}
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};
