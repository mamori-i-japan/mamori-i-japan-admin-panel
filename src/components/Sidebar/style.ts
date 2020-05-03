import styled from 'styled-components';

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  color: #fff;
  font-size: 32px;
  line-height: 1px;

    img {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 4px;
    }

    p {
      margin: 0;
      padding-left: 8px;
      font-size: 14px;
      font-weight: bold;
    }
`;
