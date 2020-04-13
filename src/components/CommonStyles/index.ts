import styled from 'styled-components';
import { Form } from 'antd';

export const ContentContainer = styled.div`
  margin: 24px;
  padding: 24px;
  min-height: calc(100% - 48px);
  background-color: #fff;
`;

export const DetailForm = styled(Form)`
  max-width: 420px;
`;
