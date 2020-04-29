import styled from 'styled-components';
import { Layout } from 'antd';

export const PageLayout = styled(Layout)`
  width: 100%;
  height: 100%;
  min-height: 100vh !important;

  .feedback-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
`;
