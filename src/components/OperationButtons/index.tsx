import React, { useContext } from 'react';
import { Button } from 'antd';
import { I18nContext } from '../../locales';
import styled from 'styled-components';

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
  handleDelete?: () => void;
}

export default ({ handleEdit, handleDelete }: IProps) => {
  const { translate } = useContext(I18nContext);

  return (
    <Buttons>
      <Button onClick={handleEdit}>
        {translate('editItem')}
      </Button>

      <Button danger onClick={handleDelete}> {translate('deleteItem')} </Button>
    </Buttons>
  );
};
