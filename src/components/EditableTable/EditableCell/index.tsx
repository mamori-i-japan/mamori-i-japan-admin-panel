import React from 'react';
import { Input, InputNumber, Form } from 'antd';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: any;
  index: number;
  children: React.ReactNode;
}

export default ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: EditableCellProps) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
        >
          {inputNode}
        </Form.Item>
      ) : (
          children
        )}
    </td>
  );
};
