import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Table, Button, Tag } from 'antd';
import { I18nContext } from '../../locales';
import { langCode } from '../../constants';
import { ContentContainer } from '../../components/CommonStyles';

const { Title } = Typography;

const dataSource = [
  {
    key: 1,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  }
];

export default () => {
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = false;
  let columns: any = [
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
      title: 'createDate',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: 'agreed',
      dataIndex: 'agreed',
      key: 'agreed',
      render: (value: number) => (value === 1 ? '同意' : ''),
    },
  ];

  const handleCreate = () => {
    history.push('/positives/create');
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    columns = columns.map((item: any) => {
      return {
        ...item,
        title: item[`title${langCode}`],
      };
    });
  });

  return (
    <ContentContainer>
      <header>
        <Title level={4}>{translate('list')}</Title>
        <Button type="primary" size="large" onClick={handleCreate}>
          {translate('createItem')}
        </Button>
      </header>

      <section>
        <Table loading={loading} dataSource={dataSource} columns={columns} />
      </section>
    </ContentContainer>
  );
};
