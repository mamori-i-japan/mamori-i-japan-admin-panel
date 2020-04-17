import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Table, Button, Tag } from 'antd';
import { I18nContext } from '../../locales'
import { ContentContainer } from '../../components/CommonStyles';

const { Title } = Typography;

const dataSource = [
  {
    key: 1,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createdDate: '2020.04.30',
    age: 32,
    agreed: 1,
  }
];

export const columns: any = [
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: (value: number) => (
      <Tag color={value === 1 ? 'red' : 'green'}>
        {value === 1 ? '陽性' : '回復'}
      </Tag>
    ),
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'UUID',
    dataIndex: 'uuid',
    key: 'uuid',
  },
  {
    title: 'age',
    dataIndex: 'age',
    key: 'age',
  },

  {
    title: 'address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'createdDate',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: 'agreed',
    dataIndex: 'agreed',
    key: 'agreed',
    render: (value: number) => (value === 1 ? '同意' : ''),
  },
];

export default () => {
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = false;

  const handleCreate = () => {
    history.push('/positives/create');
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
