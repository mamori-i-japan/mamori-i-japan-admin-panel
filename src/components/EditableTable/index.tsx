import React, { useState, useContext } from 'react';
import { Table, Form, Button } from 'antd';
import EditableCell from './EditableCell';
import { ColumnType } from 'antd/lib/table';
import { I18nContext } from '../../locales';

interface RecordTypeDefault {
  key: string;
}

export interface ColumnTypeWithEditable<T> extends ColumnType<T> {
  key: string;
  title: string;
  dataIndex: string;
  editable: boolean;
}

interface EditableTableProps<T> {
  loading: boolean;
  dataSource: Array<T>;
  editItem: any;
  columns: Array<ColumnTypeWithEditable<T>>;
}

export default <T extends RecordTypeDefault>({
  loading,
  editItem,
  dataSource,
  columns,
}: EditableTableProps<T>) => {
  const [form] = Form.useForm();
  const { translate } = useContext(I18nContext);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: T) => record.key === editingKey;

  const edit = (record: T) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const values = (await form.validateFields()) as T;
      const index = dataSource.findIndex((item) => key === item.key);

      editItem({ ...dataSource[index], ...values });

      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columnsWithOperation = [
    ...columns,
    {
      title: translate('operation'),
      dataIndex: 'operation',
      width: '14rem',
      editable: false,
      render: (_: any, record: T) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="primary"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              {translate('submit')}
            </Button>

            <Button onClick={cancel}> {translate('cancel')}</Button>
          </span>
        ) : (
            <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
              {translate('editItem')}
            </Button>
          );
      },
    },
  ];

  const mergedColumns = columnsWithOperation.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: T) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        loading={loading}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey={(record: any) => record.id}
        pagination={false
          // {

          //   onChange: cancel,
          // }
        }
      />
    </Form>
  );
};
