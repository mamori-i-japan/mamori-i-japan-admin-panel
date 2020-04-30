import React, { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { I18nContext } from '../../locales';
import { ContentContainer, DetailForm } from '../../components/CommonStyles';
import FormField from '../../components/FormField';
import dataMap from './dataMap';
import { createOrganizationAction } from '../../redux/Organization/actions';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const [form] = Form.useForm();

  const loading = useSelector((store: any) => store.loading.isLoading);

  const createOrganization = useCallback((data) => dispatch(createOrganizationAction(data)), [dispatch])

  const handleBack = () => {
    history.goBack();
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        createOrganization(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
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
        <Button type="primary" size="large" loading={loading} onClick={handleSubmit}>
          {translate('submit')}
        </Button>
      </header>

      <section>
        <DetailForm
          {...layout}
          form={form}
          name="createUser"
          size="large"
        >
          {dataMap &&
            dataMap.map((item: any) => (
              <FormField
                key={item.name}
                label={translate(item.label)}
                field={item}
              />
            ))}
        </DetailForm>
      </section>
    </ContentContainer>
  )
}