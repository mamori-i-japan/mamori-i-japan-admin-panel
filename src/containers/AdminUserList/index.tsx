import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Table, Button } from 'antd';
import { I18nContext } from '../../locales'
import { ContentContainer } from '../../components/CommonStyles';

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
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = false;

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
