import React, { useContext, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import FormField from '../../components/FormField';
import { I18nContext } from '../../locales';
import { LoginContainer } from './style';
import dataMap from './dataMap';
import { loginAction } from '../../redux/Auth/actions';

const { Title } = Typography;

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const localtion = useLocation();
  const { translate } = useContext(I18nContext);

  const { from }: any = localtion.state || { from: { pathname: '/' } };

  const login = useCallback((data) => dispatch(loginAction(data)), [dispatch]);

  const onFinish = (values: any) => {
    login(values);

    // history.replace(from)
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
            <FormField
              key={item.name}
              label={translate(item.label)}
              field={item}
            />
          ))}

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {translate('loginSubmit')}
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};
