import React, { useContext, useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { I18nContext } from '../../locales';
import { ContentContainer, DetailForm } from '../../components/CommonStyles';
import FormField from '../../components/FormField';
import dataMap, {
  prefectureForm,
  organizationForm,
  roleOptions,
  RoleOption, FormItem
} from './dataMap';
import { createAdminUserAction, getOrganizationOptionsAction } from '../../redux/AdminUser/actions';

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
  const [formatOfForm, updateFormatOfForm] = useState(dataMap);
  const [currentRole, updateCurrentRole] = useState('');

  const loading = useSelector((store: any) => store.loading.isLoading);
  const organizaionsList = useSelector((store: any) => store.organization.listData);
  const { isOrganizationLoading } = useSelector((store: any) => store.adminUser);

  const createItem = useCallback((data) => dispatch(createAdminUserAction(data)), [
    dispatch,
  ]);

  const getOrganizationOptions = useCallback(() => dispatch(getOrganizationOptionsAction()), [
    dispatch,
  ]);

  // TODO: implement edit admin user
  const editItem = (values: any) => { console.log('item edited', values) };

  const handleBack = () => {
    history.goBack();
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (id === 'create') {
          createItem(values);
        } else {
          values.id = id;
          editItem(values);
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCreate = () => {
    history.push('/organizations/create');
  };

  const onRoleChange = (roleNumber: number) => {

    if (roleOptions[roleNumber].id === '2') {
      // case of prefecture admin
      const formattedForm = formatOfForm.concat([prefectureForm]);
      updateFormatOfForm(formattedForm);
    } else if (roleOptions[roleNumber].id === '3') {
      // case of organization admin
      getOrganizationOptions();
      updateFormatOfForm(dataMap);
    } else {
      updateFormatOfForm(dataMap);
    };
    updateCurrentRole(roleOptions[roleNumber].id);
  };

  const translateOptions = (item: FormItem) =>
    item.selectOptions === undefined
      ? item
      : ({
        ...item,
        selectOptions: item.selectOptions.map((option: RoleOption) => ({
          ...option,
          name: translate(option.name),
        })),
      })

  const mapOrganizationsToForm = (organizations: any, isLoading: boolean): FormItem[] =>
    (currentRole === '3') ? [
      organizationForm(
        organizations.map(
          (organization: { organizationId: string; name: string }) => (
            {
              id: organization.organizationId,
              name: organization.name,
            })
        ),
        isLoading,
      ),
    ] : [];

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
          {formatOfForm &&
            formatOfForm
              .concat(mapOrganizationsToForm(organizaionsList, isOrganizationLoading))
              .map((item: FormItem) => (
                <FormField
                  key={item.name}
                  label={translate(item.label)}
                  field={translateOptions(item)}
                  onChange={item.name === 'role' ? onRoleChange : undefined}
                  createButton={
                    item.withCreateItem
                      ? <Button size={'small'} onClick={handleCreate}>
                        {translate('createNewOrganization')}
                      </Button>
                      : <div />
                  }
                />
              ))
          }
        </DetailForm>
      </section>
    </ContentContainer>
  );
};
