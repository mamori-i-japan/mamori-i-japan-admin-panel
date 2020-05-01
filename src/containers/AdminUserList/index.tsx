import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Table, Button } from 'antd';
import { I18nContext } from '../../locales';
import { ContentContainer } from '../../components/CommonStyles';
import { getAdminUsersAction } from '../../redux/AdminUser/actions';
import moment from 'moment';

const { Title } = Typography;

export const columns: any = [
  {
    title: 'ID',
    dataIndex: 'adminUserId',
  },
  {
    title: 'email',
    dataIndex: 'email',
  },
  {
    title: 'addedByAdminEmail',
    dataIndex: 'addedByAdminEmail',
  },
  {
    title: 'createdDate',
    dataIndex: 'created',
    render: (value: number) =>
      moment(new Date(value * 1000)).format('YYYY-MM-DD HH:MM'),
  },
];

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = useSelector((store: any) => store.loading.isLoading);
  const { listData } = useSelector((store: any) => store.adminUser);

  const fetchData = useCallback(() => dispatch(getAdminUsersAction()), [
    dispatch,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <Table
          loading={loading}
          dataSource={listData}
          rowKey={(record: any) => record.adminUserId}
          columns={columns.map((item: any) => ({
            ...item,
            title: translate(item.title),
          }))}
        />
      </section>
    </ContentContainer>
  );
};
