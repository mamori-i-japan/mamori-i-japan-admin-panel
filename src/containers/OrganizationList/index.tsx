import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'antd';
import moment from 'moment';
import OperationButtons from '../../components/OperationButtons';
import { I18nContext } from '../../locales';
import { ContentContainer } from '../../components/CommonStyles';
import {
  getOrganizationsAction,
  deleteOrganizationAction,
  getOrganizationAction,
  clearOrganizationAction
} from '../../redux/Organization/actions';
import { Store } from '../../redux/types';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = useSelector((store: Store) => store.loading.isLoading);
  const { listData } = useSelector((store: Store) => store.organization);

  const fetchData = useCallback(() => dispatch(getOrganizationsAction()), [
    dispatch,
  ]);

  const deleteItem = useCallback(
    (id) => dispatch(deleteOrganizationAction({ id })),
    [dispatch]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = () => {
    dispatch(clearOrganizationAction());
    history.push('/organizations/create');
  };

  const handleEdit = (id: string) => {
    dispatch(getOrganizationAction({ id }));
    history.push(`/organizations/${id}`);
  };

  const columns: any = [
    {
      title: 'organizationName',
      dataIndex: 'name',
    },
    {
      title: 'organizationCode',
      dataIndex: 'organizationCode',
    },
    {
      title: 'message',
      dataIndex: 'message',
    },
    {
      title: 'createdDate',
      dataIndex: 'created',
      render: (value: any) =>
        moment(new Date(value * 1000)).format('YYYY-MM-DD HH:MM'),
    },
    {
      title: 'operation',
      render: ({ id }: { id: string }) => {
        return (
          <OperationButtons
            handleEdit={() => handleEdit(id)}
            deleteItem={() => deleteItem(id)}
          />
        );
      },
    },
  ];

  return (
    <ContentContainer>
      <header className="flex-end">
        <Button type="primary" size="large" onClick={handleCreate}>
          {translate('createItem')}
        </Button>
      </header>

      <section>
        <Table
          loading={loading}
          dataSource={listData}
          rowKey={(record: any) => record.id}
          columns={columns.map((item: any) => {
            return {
              ...item,
              title: translate(item.title),
            };
          })}
          pagination={false}
        />
      </section>
    </ContentContainer>
  );
};
