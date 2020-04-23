import React, { useContext, useCallback, useEffect } from 'react';
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
    title: 'adminUserId',
    dataIndex: 'adminUserId',
  },
  {
    title: 'created',
    dataIndex: 'created',
  },
];

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = useSelector((store: any) => store.loading.isloading);
  const { listData } = useSelector((store: any) => store.adminUser);

  const fetchData = useCallback(() => dispatch(getAdminUsersAction()), [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(listData);

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
