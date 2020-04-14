import React from 'react';
import FormFieldContent from '../FormField';

const DynamicRulesFields = ({ form, field, data }: any) => {
  const { getFieldValue } = form;

  return (
    <>
      {field.subItem.map((item: any) => {
        return (
          <FormFieldContent
            key={item.key}
            form={form}
            field={item}
            fieldKey={item.key}
            rules={
              item.isDynamicRule
                ? [{ required: getFieldValue(field.controlKey) }]
                : item.rule
            }
            defaultValue={data ? data[item.key] : null}
          />
        );
      })}
    </>
  );
};

export default DynamicRulesFields;
