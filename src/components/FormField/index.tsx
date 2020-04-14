import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  message,
  Icon,
  Button,
  Checkbox,
  Modal,
  TimePicker
} from 'antd';
import moment from 'moment';
import { find } from 'lodash';
import DynamicRulesFields from '../DynamicRulesFields';
import DynamicFormFields from '../DynamicFormFields';

const { Option } = Select;
const { TextArea } = Input;
const timeFormat = 'HH:mm';

//TODO: fix me
type FormFieldContentProps = {
  form: any;
  field: any;
  fieldKey: string;
  defaultValue: any;
  selectData?: any;
  data?: any;
  rules?: any;
  voucherOption?: string;
  voucherType?: string;
  modalFor?: string;
  relatedKey?: string | undefined;
};

export const getBase64SingleImage = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const beforeUpload: any = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    return message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

export const UploadButton = () => (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess(getBase64(file));
  }, 0);
};

const FormFieldContent = ({
  form,
  field,
  fieldKey,
  defaultValue,
  selectData,
  data,
  rules,
  relatedKey,
  voucherOption,
  voucherType,
  modalFor
}: FormFieldContentProps) => {
  const { getFieldDecorator } = form;
  const [url, setUrl] = useState(defaultValue || field.value);
  const [multipleImage, setMultipleImage] = useState({
    previewVisible: false,
    previewImage: undefined
  });

  const handleCancel = () =>
    setMultipleImage((prevState: any) => ({
      ...prevState,
      previewVisible: false
    }));

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setMultipleImage((prevState: any) => ({
      ...prevState,
      previewImage: file.url || file.preview,
      previewVisible: true
    }));
  };

  if (field.type === 'dynamicRules') {
    return (
      <DynamicRulesFields
        key={field.key}
        field={field}
        form={form}
        data={data}
      />
    );
  }

  // if (field.type === 'dynamicFields') {
  //   return (
  //     <DynamicFormFields
  //       key={field.key}
  //       form={form}
  //       fieldKey={field.key}
  //       title={field.label}
  //       data={data}
  //       keysName={relatedKey ? `${relatedKey}-sub-keys` : `${field.key}-keys`}
  //       relatedKey={relatedKey}
  //       fieldMap={field.subItem}
  //       selectData={selectData}
  //       optional={field.optional}
  //       groupFieldId={data && data[field.key] ? data[field.key].length - 1 : 0}
  //     />
  //   );
  // }

  if (field.type === 'select') {
    return (
      <Form.Item
        className={field.className || 'p-3 col-sm-6'}
        key={fieldKey}
        label={field.label}
        colon={false}
      >
        {getFieldDecorator(fieldKey, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue:
            (defaultValue && defaultValue[0] && defaultValue[0].sort
              ? defaultValue.map((item: any) => item.id)
              : defaultValue) || field.value,
          rules: field.rules
        })(
          <Select
            mode="default"
            className="w-100"
            size="large"
            placeholder={field.placeholder}
          >
            {selectData[field.selectOptions] &&
              selectData[field.selectOptions].map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }

  if (field.type === 'selectMultipleMode') {
    return (
      <Form.Item
        className={field.className || 'p-3 col-sm-6'}
        key={fieldKey}
        label={field.label}
        colon={false}
      >
        {getFieldDecorator(fieldKey, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue:
            (defaultValue && defaultValue[0] && defaultValue[0].sort
              ? defaultValue.map((item: any) => item.id)
              : defaultValue) || field.value,
          rules: field.rules,
          getValueProps: (value: any) => {
            const formatedValue: any = [];

            value.map((id: any) => {
              const foundItem = find(
                selectData[field.selectOptions],
                (item: any) => item.id === id
              );

              if (foundItem) {
                formatedValue.push(`${foundItem.id}-${foundItem.name}`);
              }
            });

            return { value: formatedValue };
          },
          getValueFromEvent: (value: any) => {
            const formatedValue: any = [];

            value.map((item: any) => {
              const array = item.split('-');

              formatedValue.push(array[0]);
            });

            return formatedValue;
          }
        })(
          <Select
            mode="multiple"
            className="w-100"
            size="large"
            placeholder={field.placeholder}
          >
            {selectData[field.selectOptions] &&
              selectData[field.selectOptions].map((item: any) => (
                <Option key={item.id} value={`${item.id}-${item.name}`}>
                  {item.name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }

  if (field.type === 'textArea') {
    return (
      <Form.Item
        className="col-sm-12 p-3"
        key={fieldKey}
        label={field.label}
        colon={false}
      >
        {getFieldDecorator(fieldKey, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: defaultValue || field.value,
          rules: field.rules
        })(
          <TextArea
            autosize={{ minRows: 3, maxRows: 8 }}
            className="w-100"
            placeholder={field.placeholder}
          />
        )}
      </Form.Item>
    );
  }

  if (field.type === 'date') {
    return (
      <Form.Item
        className="p-3 col-sm-6"
        key={fieldKey}
        label={field.label}
        colon={false}
      >
        {getFieldDecorator(fieldKey, {
          rules: field.rules,
          initialValue: defaultValue ? moment(defaultValue) : undefined
        })(<DatePicker className="col-sm-12" size="large" />)}
      </Form.Item>
    );
  }

  if (field.type === 'image') {
    return (
      <Form.Item
        key={fieldKey}
        className="p-3 col-sm-12"
        label={field.label}
        colon={false}
      >
        {getFieldDecorator(fieldKey, {
          validateTrigger: ['onChange'],
          initialValue: { uri: defaultValue },
          rules: field.rules,
          valuePropName: 'file',
          getValueFromEvent: (e: any) => {
            getBase64SingleImage(e.file.originFileObj, (imageUrl: string) => {
              setUrl(imageUrl);
              e.url = imageUrl;
            });

            return e;
          }
        })(
          <Upload
            customRequest={() => {}}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {url ? (
              <img
                src={url}
                alt=""
                style={{ width: 'auto', height: '200px' }}
              />
            ) : (
              <UploadButton />
            )}
          </Upload>
        )}
        {field.description && <p>{field.description}</p>}
      </Form.Item>
    );
  }

  if (field.type === 'file') {
    if (modalFor === 'Voucher') {
      if (voucherType === 'pincode' && voucherOption !== 'fileUpload') {
        return null;
      } else {
        return (
          <Form.Item
            key={fieldKey}
            className="p-3 col-sm-12"
            label={field.label}
            colon={false}
          >
            {getFieldDecorator(fieldKey, {
              initialValue: defaultValue,
              valuePropName: 'fileList',
              getValueFromEvent: (e: any) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              },
              validateTrigger: ['onChange'],
              rules: field.rules
            })(
              <Upload name="file" customRequest={() => {}} listType="picture">
                <Button>
                  <Icon type="upload" />
                  Select File
                </Button>
              </Upload>
            )}
          </Form.Item>
        );
      }
    }
    return (
      <Form.Item
        key={fieldKey}
        className="p-3 col-sm-12"
        label={field.label}
        colon={false}
      >
        {getFieldDecorator(fieldKey, {
          initialValue: defaultValue,
          valuePropName: 'fileList',
          getValueFromEvent: (e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          },
          validateTrigger: ['onChange'],
          rules: field.rules
        })(
          <Upload
            name="file"
            customRequest={() => {}}
            listType="picture"
            // onRemove={onRemove}   //TODO
            // beforeUpload={beforeUpload}   //TODO
          >
            <Button>
              <Icon type="upload" />
              Select File
            </Button>
          </Upload>
        )}
      </Form.Item>
    );
  }

  if (field.type === 'inputNumber') {
    return (
      <Form.Item
        key={fieldKey}
        className="p-3 col-sm-6"
        label={field.label}
        colon={false}
      >
        {getFieldDecorator(fieldKey, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: defaultValue || field.value,
          rules: field.rules
        })(
          <InputNumber
            className="w-100"
            size="large"
            placeholder={field.placeholder}
          />
        )}
      </Form.Item>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <Form.Item
        key={fieldKey}
        className="p-3 col-sm-6"
        label={field.label}
        colon={false}
      >
        {getFieldDecorator(fieldKey, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: defaultValue || !!field.value,
          valuePropName: 'checked',
          rules: field.rules
        })(<Checkbox />)}
      </Form.Item>
    );
  }

  if (field.type === 'multipleImage') {
    return (
      <Form.Item
        key={fieldKey}
        className="p-3 col-sm-12"
        label={field.label}
        colon={false}
      >
        {getFieldDecorator(fieldKey, {
          validateTrigger: ['onChange'],
          rules: field.rules,
          initialValue: defaultValue || [],
          valuePropName: 'fileList',
          getValueFromEvent: (e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }
        })(
          <Upload
            customRequest={dummyRequest}
            listType="picture-card"
            showUploadList={true}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
          >
            <UploadButton />
          </Upload>
        )}
        <Modal
          visible={multipleImage.previewVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{ width: '100%' }}
            src={multipleImage.previewImage}
          />
        </Modal>
      </Form.Item>
    );
  }

  if (field.type === 'timePicker') {
    return (
      <Form.Item
        key={fieldKey}
        className={field.className || 'col-sm-12'}
        label={field.label}
        colon={false}
      >
        {getFieldDecorator(fieldKey, {
          initialValue: defaultValue
            ? moment(defaultValue, timeFormat)
            : field.value,
          rules: field.rules
        })(
          <TimePicker
            size="large"
            style={{ width: '100%' }}
            format={timeFormat}
          />
        )}
      </Form.Item>
    );
  }

  if (field.type === 'hiddenId') {
    return (
      <div style={{ display: 'none' }}>
        <Form.Item>
          {getFieldDecorator(fieldKey, {
            initialValue: defaultValue || field.value
          })(<Input />)}
        </Form.Item>
      </div>
    );
  }

  return (
    <Form.Item
      key={fieldKey}
      className="p-3 col-sm-6"
      label={field.label}
      colon={false}
    >
      {getFieldDecorator(fieldKey, {
        validateTrigger: ['onChange', 'onBlur'],
        initialValue: defaultValue || field.value,
        rules: rules || field.rules
      })(
        <Input className="w-100" size="large" placeholder={field.placeholder} />
      )}
    </Form.Item>
  );
};

export default FormFieldContent;
