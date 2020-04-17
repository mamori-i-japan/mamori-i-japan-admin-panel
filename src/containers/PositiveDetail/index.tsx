import React, { useContext } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { I18nContext } from '../../locales';
import { ContentContainer, DetailForm } from '../../components/CommonStyles';
import FormField from '../../components/FormField';
import { langCode } from '../../constants';
import dataMap from './dataMap';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default () => {
  const history = useHistory();
  const { translate } = useContext(I18nContext);

  const handleBack = () => {
    history.goBack();
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <ContentContainer>
      <header>
        <Button
          type="link"
          size="large"
          onClick={handleBack}
          icon={<ArrowLeftOutlined />}
        >
          {translate('back')}
        </Button>
        <Button type="primary" size="large" htmlType="submit">
          {translate('submit')}
        </Button>
      </header>

      <section>
        <DetailForm
          {...layout}
          name="positive form"
          size="large"
          initialValues={{
            status: 'positive',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {dataMap &&
            dataMap.map((item: any) => (
              <FormField
                key={item.name}
                label={item[`label${langCode}`]}
                field={item}
              />
            ))}
        </DetailForm>
      </section>
    </ContentContainer>
  );
};
