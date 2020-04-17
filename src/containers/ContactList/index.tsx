import React, { useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { Typography, Table } from 'antd';
import { I18nContext } from '../../locales';
import { langCode } from '../../constants';
import { ContentContainer } from '../../components/CommonStyles';
import { columns } from '../PositiveList';

const { Title } = Typography;

const dataSource = [
  {
    key: 1,
    phone: '08077667788',
    uuid: '',
    address: 'address code',
    createDate: '2020.04.30',
    age: 32,
    agreed: 1,
  },
];

export default () => {
  const { translate } = useContext(I18nContext);
  const loading = false;

  return (
    <ContentContainer>
      <header>
        <Title level={4}>{translate('list')}</Title>
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
