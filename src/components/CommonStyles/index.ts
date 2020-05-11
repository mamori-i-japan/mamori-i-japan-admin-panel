import styled from 'styled-components';
import { Form } from 'antd';

export const ContentContainer = styled.div`
  margin: 24px;
  padding: 24px;
  min-height: calc(100% - 48px);
  background-color: #fff;
  overflow: hidden;

  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &.flex-end {
      justify-content: flex-end;
    }
  }

  p {
    white-space: pre-wrap;
  }

  .ant-btn-link {
    padding-left: 0;
  }

  section {
    width: 100%;
    padding-top: 24px;
    overflow-x: scroll;
  }

  .ant-table {
    border: 1px solid #f0f0f0;
    border-bottom: none;
  }
`;

export const DetailForm = styled(Form)`
  max-width: 420px;
`;
