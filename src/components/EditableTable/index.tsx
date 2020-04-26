import React, { useState } from 'react';
import { Table, Popconfirm, Form, Button } from 'antd';
import EditableCell from './EditableCell';
import { ColumnType } from 'antd/lib/table';

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
      // TODO: localization
      title: 'operation',
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
              Save
            </Button>
            {/* TODO: localization */}
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button>Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
            <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
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
        bordered
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
