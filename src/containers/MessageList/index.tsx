import React, { useContext, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { I18nContext } from '../../locales';
import { ContentContainer } from '../../components/CommonStyles';
import prefecturesMap from '../../constants/Prefecture';
import EditableTabel, {
  ColumnTypeWithEditable,
} from '../../components/EditableTable';
import { getMessagesAction } from '../../redux/Message/actions';

const { Title } = Typography;

interface RecordType {
  key: string;
  id: number;
  content: string;
  address: string;
}

const dataSource: Array<RecordType> = [
  {
    key: '0',
    id: 0,
    content:
      'ソーシャルディスタンスを保って生活してください。\n体調が悪い場合はxxxまで連絡してください。',
    address: 'デフォルト',
  },
  {
    key: '1',
    id: 1,
    content:
      'ソーシャルディスタンスを保って生活してください。\n体調が悪い場合はxxxまで連絡してください。',
    address: prefecturesMap['ja'][1],
  },
  {
    key: '13',
    id: 13,
    content:
      'ソーシャルディスタンスを保って生活してください。\n体調が悪い場合はxxxまで連絡してください。',
    address: prefecturesMap['ja'][13],
  },
];

export default () => {
  const { translate } = useContext(I18nContext);
  const dispatch = useDispatch();

  const loading = useSelector((store: any) => store.loading.isLoading);
  const { listData } = useSelector((store: any) => store.adminUser);

  const fetchData = useCallback(() => dispatch(getMessagesAction()), [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
  ];

  return (
    <ContentContainer>
      <header>
        <Title level={4}>{translate('list')}</Title>
      </header>

      <section>
        <EditableTabel<RecordType>
          loading={loading}
          dataSource={listData}
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
