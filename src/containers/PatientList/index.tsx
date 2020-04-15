import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Table, Button } from 'antd';
import { I18nContext } from '../../locales';
import { langCode } from '../../constants';
import { ContentContainer } from '../../components/CommonStyles';

const { Title } = Typography;

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export default () => {
  const history = useHistory();
  const { translate } = useContext(I18nContext);

  const handleCreate = () => {
    history.push('/patients/create')
  }

  return (
    <ContentContainer>

      <header>
        <Title level={4}>{translate('list')}</Title>

        <Button size="large" onClick={handleCreate}>{translate('createItem')}</Button>

      </header>

      <section>
        <Table dataSource={dataSource} columns={columns} />
      </section>

    </ContentContainer>
  )
}
