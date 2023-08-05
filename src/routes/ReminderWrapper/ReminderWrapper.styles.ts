import styled from 'styled-components';

const Root = styled.div`
  max-width: 1440px;
  width: 50%;
  display: flex;
  flex-direction: column;
  height: calc(80vh);
`;

const LeftMenu = styled.div`
  margin-top: 3.5vh;
  @media (max-width: 1440px) {
    margin-top: 5vh;
  }
`;

export { Root, LeftMenu };
