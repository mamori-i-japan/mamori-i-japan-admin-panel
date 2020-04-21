import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { I18nContext } from '../../locales';
import { ContentContainer } from '../../components/CommonStyles';
import prefecturesMap from '../../constants/Prefecture';
import EditableTabel, {
  ColumnTypeWithEditable,
} from '../../components/EditableTable';

const { Title } = Typography;

interface RecordType {
  key: string;
  id: number;
  content: string;
  address: string;
  createDate: string;
}

const dataSource: Array<RecordType> = [
  {
    key: '0',
    id: 0,
    content:
      'ソーシャルディスタンスを保って生活してください。\n体調が悪い場合はxxxまで連絡してください。',
    address: 'デフォルト',
    createDate: '2020.04.30',
  },
  {
    key: '1',
    id: 1,
    content:
      'ソーシャルディスタンスを保って生活してください。\n体調が悪い場合はxxxまで連絡してください。',
    address: prefecturesMap['ja'][1],
    createDate: '2020.04.30',
  },
  {
    key: '13',
    id: 13,
    content:
      'ソーシャルディスタンスを保って生活してください。\n体調が悪い場合はxxxまで連絡してください。',
    address: prefecturesMap['ja'][13],
    createDate: '2020.04.30',
  },
];

export default () => {
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = false;
  const columns: Array<ColumnTypeWithEditable<RecordType>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      editable: false,
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
      editable: true,
    },
    {
      title: 'prefecture',
      dataIndex: 'address',
      key: 'address',
      editable: false,
    },
    {
      title: 'registrationDate',
      dataIndex: 'createDate',
      key: 'createDate',
      editable: false,
    },
  ];

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
        <EditableTabel<RecordType>
          loading={loading}
          dataSource={dataSource}
          columns={columns.map((item: ColumnTypeWithEditable<RecordType>) => {
            return {
              ...item,
              title: translate(item.title),
            };
          })}
        />
      </section>
    </ContentContainer>
  );
};
