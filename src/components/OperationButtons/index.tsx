import React, { useContext } from 'react';
import { Button, Modal } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { I18nContext } from '../../locales';
import styled from 'styled-components';

const { confirm } = Modal;

const Buttons = styled.div`
  display: flex;
  button {
    + button {
      margin-left: 8px;
    }
  }
`;

interface IProps {
  handleEdit?: () => void;
  deleteItem?: () => void;
}

export default ({ handleEdit, deleteItem }: IProps) => {
  const { translate } = useContext(I18nContext);

  const handleDelete = () => {
    confirm({
      title: translate('deleteConfirmTitle'),
      icon: <ExclamationCircleOutlined />,
      okText: translate('deleteItem'),
      onOk() {
        if (deleteItem) {
          deleteItem();
        }
      },
    });
  };

  return (
    <Buttons>
      {handleEdit && <Button onClick={handleEdit}>{translate('editItem')}</Button>}

      {deleteItem && (
        <Button danger onClick={handleDelete}>
          {translate('deleteItem')}
        </Button>
      )}
    </Buttons>
  );
};
