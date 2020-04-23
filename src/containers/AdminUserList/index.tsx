import React, { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Table, Button } from 'antd';
import { I18nContext } from '../../locales'
import { ContentContainer } from '../../components/CommonStyles';
import { getAdminUsersAction } from '../../redux/AdminUser/actions';


const { Title } = Typography;

const dataSource = [
  {
    key: 1,
    phone: '08077667788',
    createdDate: '2020.04.30'
  }
];

export const columns: any = [
  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'createdDate',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
];

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = useSelector((store: any) => store.loading.isloading);
  const getListData = useCallback(() => dispatch(getAdminUsersAction()), [dispatch]);

  const handleCreate = () => {
    history.push('/users/create');
  };

  return (
    <ContentContainer>
      <header>
        <Title level={4}>{translate('list')}</Title>
        <Button type="primary" size="large" onClick={handleCreate}>
          {translate('createItem')}
        </Button>
      </header>

      <section>
        <Table loading={loading} dataSource={dataSource} columns={columns.map((item: any) => {
          return {
            ...item,
            title: translate(item.title),
          };
        })} />
      </section>
    </ContentContainer>
  );
};
