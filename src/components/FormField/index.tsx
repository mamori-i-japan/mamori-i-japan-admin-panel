import React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Checkbox,
  TimePicker,
} from 'antd';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
const timeFormat = 'HH:mm';

//TODO: fix me
type FormFieldContentProps = {
  field: any;
  defaultValue?: any;
  selectData?: any;
};

export default ({ field, defaultValue, selectData }: FormFieldContentProps) => {
  const { type, className, label, placeholder, key, rules } = field;

  switch (type) {
    case 'select':
      return (
        <Form.Item
          className={className}
          key={key}
          label={label}
          rules={rules}
          colon={false}
        >
          <Select size="large" placeholder={placeholder}>
            {selectData[field.selectOptions] &&
              selectData[field.selectOptions].map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
      );

    case 'textArea':
      return (
        <Form.Item key={key} label={field.label} rules={rules} colon={false}>
          <TextArea
            // autosize={{ minRows: 3, maxRows: 8 }}
            placeholder={field.placeholder}
          />
        </Form.Item>
      );

    case 'date':
      return (
        <Form.Item key={key} label={field.label} rules={rules} colon={false}>
          <DatePicker size="large" />
        </Form.Item>
      );

    case 'inputNumber':
      return (
        <Form.Item key={key} label={field.label} rules={rules} colon={false}>
          <InputNumber size="large" placeholder={field.placeholder} />
        </Form.Item>
      );

    case 'checkbox':
      return (
        <Form.Item
          key={key}
          className={className}
          label={field.label}
          rules={rules}
          colon={false}
        >
          <Checkbox />
        </Form.Item>
      );

    case 'timePicker':
      return (
        <Form.Item
          key={key}
          className={className}
          label={label}
          rules={rules}
          colon={false}
        >
          <TimePicker size="large" format={timeFormat} />
        </Form.Item>
      );

    case 'hiddenId':
      return (
        <div style={{ display: 'none' }}>
          <Form.Item>
            <Input placeholder={placeholder} />
          </Form.Item>
        </div>
      );

    case 'password':
      return (
        <Form.Item
          key={key}
          className={className}
          label={label}
          rules={rules}
          colon={false}
        >
          <Input.Password placeholder={placeholder} />
        </Form.Item>
      );

    default:
      return (
        <Form.Item key={key} label={label} rules={rules} colon={false}>
          <Input placeholder={placeholder} />
        </Form.Item>
      );
  }
};
