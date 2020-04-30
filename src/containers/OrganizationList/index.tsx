import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Table, Button } from 'antd';
import { I18nContext } from '../../locales';
import { ContentContainer } from '../../components/CommonStyles';
import { getOrganizationsAction } from '../../redux/Organization/actions';
import moment from 'moment';

const { Title } = Typography;

export const columns: any = [
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
    dataIndex: 'message'
  },
  {
    title: 'addedByAdminEmail',
    dataIndex: 'addedByAdminEmail',
  },
  {
    title: 'createdDate',
    dataIndex: 'created',
    render: (value: number) => moment(value).format('YYYY-MM-DD HH:MM'),
  },
];


export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = useSelector((store: any) => store.loading.isLoading);
  const { listData } = useSelector((store: any) => store.organization);

  const fetchData = useCallback(() => dispatch(getOrganizationsAction()), [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = () => {
    history.push('/organizations/create');
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
          rowKey={(record: any) => record.id}
          columns={columns.map((item: any) => {
            return {
              ...item,
              title: translate(item.title),
            };
          })}
        />
      </section>
    </ContentContainer>
  )
}
