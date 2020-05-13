import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Typography } from 'antd';
import moment from 'moment';
import OperationButtons from '../../components/OperationButtons';
import { I18nContext } from '../../locales';
import { ContentContainer } from '../../components/CommonStyles';
import {
  getAdminUsersAction,
  deleteAdminUserAction,
} from '../../redux/AdminUser/actions';
import { Store } from '../../redux/types';

const { Title } = Typography;

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = useSelector((store: Store) => store.loading.isLoading);
  const { listData } = useSelector((store: Store) => store.adminUser);

  const fetchData = useCallback(() => dispatch(getAdminUsersAction()), [
    dispatch,
  ]);

  const deleteItem = useCallback((id) => dispatch(deleteAdminUserAction({ id })), [
    dispatch,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = () => {
    history.push('/users/create');
  };

  // const handleEdit = (id: string) => {
  //   // dispatch(getAdminUserAction(id));
  //   history.push(`/users/${id}`);
  // };

  const columns: any = [
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
      title: 'permission',
      dataIndex: 'userAdminRole',
      render: (value: string) => translate(value),
    },
    {
      title: 'createdDate',
      dataIndex: 'createdAt',
      render: (value: number) =>
        value ? moment(new Date(value * 1000)).format('YYYY-MM-DD HH:mm') : '',
    },
    {
      title: 'operation',
      render: ({ adminUserId }: { adminUserId: string }) => {
        return (
          <OperationButtons
            // handleEdit={() => handleEdit(adminUserId)}
            deleteItem={() => deleteItem(adminUserId)}
          />
        );
      },
    },
  ];

  return (
    <ContentContainer>
      <header>
        <Title level={3}>{translate('adminUser') + translate('list')}</Title>
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
          pagination={false}
        />
      </section>
    </ContentContainer>
  );
};
