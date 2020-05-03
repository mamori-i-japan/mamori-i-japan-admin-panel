import React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Checkbox,
  TimePicker,
  Radio,
} from 'antd';
// import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
const timeFormat = 'HH:mm';

type FormFieldContentProps = {
  field: any;
  label: string;
  onChange?: ((value: number) => void);
};

export default ({
  field,
  label,
  onChange,
}: FormFieldContentProps) => {
  const { type, className, placeholder, name, rules } = field;

  switch (type) {
    case 'select':
      return (
        <Form.Item
          className={className}
          name={name}
          label={label}
          rules={rules}
          colon={false}
        >
          <Select size="large" placeholder={placeholder} onChange={onChange}>
            {field.selectOptions &&
              field.selectOptions.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
      );

    case 'radio':
      return (
        <Form.Item
          className={className}
          name={name}
          label={label}
          rules={rules}
          colon={false}
        >
          <Radio.Group>
            {field.options &&
              field.options.map(
                ({ value, name }: { value: string; name: string }) => (
                  <Radio key={value} value={value}>
                    {name}
                  </Radio>
                )
              )}
          </Radio.Group>
        </Form.Item>
      );

    case 'checkbox':
      return (
        <Form.Item
          key={name}
          name={name}
          className={className}
          label={label}
          rules={rules}
          colon={false}
        >
          <Checkbox />
        </Form.Item>
      );

    case 'date':
      return (
        <Form.Item
          key={name}
          name={name}
          label={label}
          rules={rules}
          colon={false}
        >
          <DatePicker size="large" />
        </Form.Item>
      );

    case 'timePicker':
      return (
        <Form.Item
          key={name}
          name={name}
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
          key={name}
          name={name}
          className={className}
          label={label}
          rules={rules}
          colon={false}
        >
          <Input.Password placeholder={placeholder} />
        </Form.Item>
      );

    case 'textArea':
      return (
        <Form.Item name={name} label={label} rules={rules} colon={false}>
          <TextArea placeholder={field.placeholder} />
        </Form.Item>
      );

    case 'inputNumber':
      return (
        <Form.Item
          key={name}
          name={name}
          label={label}
          rules={rules}
          colon={false}
        >
          <InputNumber
            size="large"
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
          />
        </Form.Item>
      );

    case 'phoneInput':
      return (
        <Form.Item
          key={name}
          name={name}
          className={className}
          label={label}
          rules={rules}
          colon={false}
        >
          <Input addonBefore={field.addonBefore} placeholder={placeholder} />
        </Form.Item>
      )

    default:
      return (
        <Form.Item
          key={name}
          name={name}
          className={className}
          label={label}
          rules={rules}
          colon={false}
        >
          <Input placeholder={placeholder} disabled={field.readOnly} />
        </Form.Item>
      );
  }
};
