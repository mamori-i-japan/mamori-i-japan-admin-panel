import React, { useContext, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { I18nContext } from '../../locales';
import { ContentContainer } from '../../components/CommonStyles';
import prefecturesMap from '../../constants/Prefecture';
import EditableTable, {
  ColumnTypeWithEditable,
} from '../../components/EditableTable';
import {
  getMessagesAction,
  updateMessageAction,
} from '../../redux/PrefectureMessage/actions';
import { PrefectureMessage } from '../../redux/PrefectureMessage/types';
import { langCode } from '../../constants';
import { Store } from '../../redux/types';

const { Title } = Typography;

export default () => {
  const { translate } = useContext(I18nContext);
  const dispatch = useDispatch();

  const loading = useSelector((store: Store) => store.loading.isLoading);
  const listData: PrefectureMessage[] = useSelector((store: Store) => store.prefectureMessage.listData);

  const fetchData = useCallback(() => dispatch(getMessagesAction()), [
    dispatch,
  ]);

  const editItem = useCallback((values) => dispatch(updateMessageAction(values)), [
    dispatch,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns: Array<ColumnTypeWithEditable<PrefectureMessage>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      editable: false,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      editable: true,
    },
    {
      title: 'prefecture',
      dataIndex: 'id',
      key: 'id',
      editable: false,
      render: (value: string) => prefecturesMap[langCode][value],
    },
  ];

  return (
    <ContentContainer>
      <header>
        <Title level={3}>
          {translate('prefectureMessage') + translate('list')}
        </Title>
      </header>
      <div>{translate('prefectureGuide')}</div>

      <section>
        <EditableTable<PrefectureMessage>
          loading={loading}
          dataSource={listData && listData.map((item: any) => ({
            ...item,
            key: item.id,
          }))}
          editItem={editItem}
          columns={columns.map((item: ColumnTypeWithEditable<PrefectureMessage>) => ({
            ...item,
            title: translate(item.title),
          }))}
        />
      </section>
    </ContentContainer>
  );
};
