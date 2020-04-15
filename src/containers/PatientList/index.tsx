import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Table, Button } from 'antd';
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
  },
  {
    key: 2,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
  {
    key: 3,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
  {
    key: 4,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
  {
    key: 5,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
  {
    key: 6,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
  {
    key: 7,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
  {
    key: 8,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
  {
    key: 9,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
  {
    key: 10,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
  {
    key: 11,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
  {
    key: 12,
    status: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
];
export default () => {
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  let columns: any = [
    {
      title: '',
      titleJa: '状況',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
      titleJa: '電話番号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '',
      titleJa: 'UUID',
      dataIndex: 'uuid',
      key: 'uuid',
    },
    {
      title: '',
      titleJa: '年齢',
      dataIndex: 'age',
      key: 'age',
    },

    {
      title: '',
      titleJa: '都道府県',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '',
      titleJa: '登録日',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '',
      titleJa: '情報提供への同意',
      dataIndex: 'agreed',
      key: 'agreed',
    },
  ];

  const handleCreate = () => {
    history.push('/patients/create');
  };

  useEffect(() => {
    columns = columns.map((item: any) => {
      item.title = item[`title${langCode}`];
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
        <Table dataSource={dataSource} columns={columns} />
      </section>
    </ContentContainer>
  );
};
