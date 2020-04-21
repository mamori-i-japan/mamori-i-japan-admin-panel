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
  columns: Array<ColumnTypeWithEditable<T>>;
}

export default <T extends RecordTypeDefault>({
  loading,
  dataSource,
  columns,
}: EditableTableProps<T>) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(dataSource);
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
      const row = (await form.validateFields()) as T;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columnsWithOperation = [
    ...columns,
    {
      title: 'operation',
      dataIndex: 'operation',
      editable: false,
      render: (_: any, record: T) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => save(record.key)} style={{ marginRight: 8 }}>
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
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
