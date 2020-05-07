import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

export const AppHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px !important;
  background-color: #fff !important;
`;
