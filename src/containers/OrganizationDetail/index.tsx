import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, notification } from 'antd';
import { ArrowLeftOutlined, SmileOutlined } from '@ant-design/icons';
import { I18nContext } from '../../locales';
import { ContentContainer, DetailForm } from '../../components/CommonStyles';
import FormField from '../../components/FormField';
import dataMap from './dataMap';
import {
  createOrganizationAction,
  updateOrganizationsAction,
  getOrganizationAction,
} from '../../redux/Organization/actions';
import { Store } from '../../redux/types';
import accessPermission from '../../constants/accessPermission';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { translate } = useContext(I18nContext);
  const [form] = Form.useForm();

  const loading = useSelector((store: Store) => store.loading.isLoading);

  const detailData = useSelector(
    (store: Store) => store.organization.detailData
  );

  const createItem = useCallback(
    (params) => dispatch(createOrganizationAction(params)),
    [dispatch]
  );

  const editItem = useCallback(
    (data) => dispatch(updateOrganizationsAction(data)),
    [dispatch]
  );

  const getItem = useCallback(
    (params) => dispatch(getOrganizationAction(params)),
    [dispatch]
  );

  const handleBack = () => {
    form.resetFields();
    history.goBack();
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (id === 'create') {
          createItem({
            data: values,
            callback: (data: any) => {
              form.resetFields();

              notification.open({
                message: ``,
                description: `${translate('organizationName')}: ${
                  data.name
                  }, ${translate('organizationCode')}: ${data.organizationCode}`,
                duration: null,
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
              });
            },
          });
        } else {
          values.id = id;
          editItem(values);
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(() => {
    if (id !== 'create') {
      getItem({
        id,
        callback: () => {
          history.replace('/no-result');
        },
      });
    } else {
      if (accessPermission.rejectCreateOrganization()) {
        history.replace('/no-result');
      }
    }
  }, [id, dispatch, history, getItem]);

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
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handleSubmit}
        >
          {translate('submit')}
        </Button>
      </header>

      <section>
        {(id === 'create' || JSON.stringify(detailData) !== '{}') && (
          <DetailForm
            {...layout}
            form={form}
            initialValues={detailData}
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
        )}
      </section>
    </ContentContainer>
  );
};
