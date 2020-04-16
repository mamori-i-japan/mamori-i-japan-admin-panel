import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Typography } from 'antd';
import { fakeAuth } from '../../router';
import FormField from '../../components/FormField';
import { I18nContext } from '../../locales';
import { langCode } from '../../constants';
import { LoginContainer } from './style';
import dataMap from './dataMap';

const { Title } = Typography;

export default () => {
  const history = useHistory();
  const localtion = useLocation();
  const { translate } = useContext(I18nContext);

  const { from }: any = localtion.state || { from: { pathname: '/' } };

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
        name="login"
        layout="vertical"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {dataMap &&
          dataMap.map((item: any) => (
            <FormField key={item.name} label={item[`label${langCode}`]} field={item} />
          ))}

        <Form.Item >
          <Button block type="primary" htmlType="submit">
            {translate('loginSubmit')}
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};
