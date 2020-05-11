import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormField from '../../components/FormField';
import SentEmail from "../../components/SentEmail";
import { I18nContext } from '../../locales';
import { LoginContainer } from './style';
import dataMap from './dataMap';
import { loginAction, autoSignInAction } from '../../redux/Auth/actions';
import { Store } from '../../redux/types';
import accessPermission from '../../constants/accessPermission';

const { Title } = Typography;

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const localtion = useLocation();
  const { translate } = useContext(I18nContext);
  const { from }: any = localtion.state || { from: { pathname: '/' } };
  const loading = useSelector((store: Store) => store.loading.isLoading);
  const [isEmailSent, changeIsEmailSent] = useState(false);

  const handlelogin = useCallback((data) => dispatch(loginAction(data)), [
    dispatch,
  ]);

  const autoLogin = useCallback(
    (params) => dispatch(autoSignInAction(params)),
    [dispatch]
  );

  const onFinish = (values: any) => {
    handlelogin({
      ...values,
      callback: () => {
        console.log('send-email-success');
        changeIsEmailSent(true);
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    autoLogin({
      callback: () => {
        if (accessPermission.accessAdminUser()) {
          history.replace(from);
        } else if (accessPermission.accessOrganization()) {
          history.replace('organizations');
        } else if (accessPermission.accessPrefecture()) {
          history.replace('prefectures');
        }
      },
    });
  }, [autoLogin, history, from]);

  return isEmailSent
    ? <SentEmail />
    : <LoginContainer>
      <Title level={3}>{translate('loginTitle')}</Title>
      <Form
        name="login"
        layout="vertical"
        size="large"
        initialValues={{ email: localStorage.getItem('emailForSignIn') }}
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
          <Button loading={loading} block type="primary" htmlType="submit">
            {translate('loginSubmit')}
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
};
