import React, { useState } from 'react';
import { Form, Button, Icon } from 'antd';
import styled from 'styled-components';
import FormField from '../FormField';


//TODO: fix me
type DynamicFormFieldsProps = {
  title: string;
  fieldKey: string;
  keysName: string;
  data: any; // defaultValues
  fieldMap: any; // subItem dataMap
  form: any; // form object
  selectData: any; // selectOptions of select
  groupFieldId: number; // for generate fieldKey
  relatedKey: string | undefined;
  optional?: boolean | undefined;
};

export default () => ({
  fieldKey,
  title,
  data,
  fieldMap,
  form,
  selectData,
  groupFieldId,
  relatedKey,
  optional,
  keysName
}: DynamicFormFieldsProps) => {
  const { getFieldDecorator, getFieldValue } = form;
  const [id, setId] = useState(groupFieldId);

  getFieldDecorator(keysName, {
    initialValue: data
      ? Array.from(
          {
            length: relatedKey
              ? data[`${relatedKey}-length`]
              : data[fieldKey].length
          },
          (value, index) =>
            relatedKey
              ? `${fieldKey}-${index}-${relatedKey}`
              : `${fieldKey}-${index}`
        )
      : optional
      ? []
      : [relatedKey ? `${fieldKey}-${0}-${relatedKey}` : `${fieldKey}-${0}`]
  });

  const keys = getFieldValue(keysName) || [];

  const onAddClick = () => {
    // can use data-binding to get
    const keys = form.getFieldValue(keysName);
    setId(prevState => prevState + 1);

    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      [keysName]: keys.concat(`${fieldKey}-${id + 1}`)
    });
  };

  const onAddSubFieldsClick = () => {
    const keys = form.getFieldValue(keysName);
    setId(prevState => prevState + 1);

    form.setFieldsValue({
      [keysName]: keys.concat(` ${fieldKey}-${id + 1}-${relatedKey}`)
    });
  };

  const onRemoveClick = (k: string) => {
    // can use data-binding to get
    const keys = form.getFieldValue(keysName);
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      [keysName]: keys.filter((key: string) => key !== k)
    });
  };

  const onRemoveSubFieldsClick = (k: string) => {
    const keys = form.getFieldValue(keysName);

    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      [keysName]: keys.filter((key: string) => key !== k)
    });
  };

  const formItems = keys.map((k: string) => {
    const valueIndex = parseInt(k.split('-')[1], 10);

    return (
      <GroupFields key={k}>
        {fieldMap &&
          fieldMap.map((field: any) => {
            const defaultValue =
              data && data[fieldKey]
                ? relatedKey
                  ? data[
                      `dynamic${fieldKey}-${valueIndex}-${field.key}-${relatedKey}`
                    ]
                  : data[fieldKey][valueIndex]
                  ? data[fieldKey][valueIndex][field.key]
                  : ''
                : '';

            return (
              <FormField
                form={form}
                key={field.key}
                relatedKey={k}
                field={field}
                data={data}
                defaultValue={defaultValue}
                fieldKey={
                  relatedKey
                    ? `dynamic${fieldKey}-${valueIndex}-${field.key}-${relatedKey}` // e.g. dynamicmenuLocalizations-0-name-menus-0
                    : `dynamic${fieldKey}-${valueIndex}-${field.key}` // e.g.  dynamicmenus-0-order
                }
                selectData={selectData}
              />
            );
          })}

        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() =>
              relatedKey ? onRemoveSubFieldsClick(k) : onRemoveClick(k)
            }
          />
        ) : null}
      </GroupFields>
    );
  });

  return (
    <Container className="dynamic-fields-container">
      <h4>{title}</h4>
      {formItems}
      <Form.Item>
        <Button
          type="dashed"
          onClick={relatedKey ? onAddSubFieldsClick : onAddClick}
          style={{
            marginTop: '32px',
            width: 'calc(100% - 40px)',
            height: '48px'
          }}
        >
          <Icon type="plus" /> Add {fieldKey} fields
        </Button>
      </Form.Item>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  .dynamic-fields-container {
    padding: 0 1rem;
  }
`;

const GroupFields = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
  width: calc(100%- 40px);
  border: 1px solid #ccc;
  margin-top: 24px;
  margin-right: 40px;
  .dynamic-delete-button {
    position: absolute;
    right: -40px;
    top: 16px;
    font-size: 24px;
  }
`;
