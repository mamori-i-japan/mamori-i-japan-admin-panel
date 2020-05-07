import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 80vh;

  .ant-form,
  .ant-typography {
    width: 90%;
    max-width: 420px;
    padding-top: 40px;
  }

  label {
    &::before {
      content: none !important;
    }
  }

  button {
    margin-top: 8px;
  }
`;
