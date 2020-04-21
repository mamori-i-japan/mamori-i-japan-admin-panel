import React, { useContext, useCallback } from 'react';
import { Button, Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { I18nContext } from '../../locales';
import { ContentContainer, DetailForm } from '../../components/CommonStyles';
import FormField from '../../components/FormField';
import dataMap from './dataMap';
import { createPositiveAction } from '../../redux/Positive/actions';

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

  const createPositive = useCallback(
    (values) => dispatch(createPositiveAction(values)),
    [dispatch]
  );

  const handleBack = () => {
    history.goBack();
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        createPositive(values);
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
          name="createPositive"
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
  );
};
