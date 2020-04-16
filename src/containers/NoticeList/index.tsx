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
    id: 1,
    content: 'text text text text text',
    address: 'address code',
    createDate: '2020.04.30',
  },
]

export default () => {

  const history = useHistory();
  const { translate } = useContext(I18nContext);
  let columns: any = [
    {
      title: '',
      titleJa: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '',
      titleJa: '内容',
      dataIndex: 'content',
      key: 'content',
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
}
