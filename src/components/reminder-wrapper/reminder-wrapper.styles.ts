import styled from 'styled-components';

const Root = styled.div`
  width: 1024px;
  // use max width if screen is 1024 pixels wide or smaller
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const MainTitleWrapeprStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const MainTitleStyle = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 35px;
  font-weight: bold;
`;

export { Root, MainTitleStyle, MainTitleWrapeprStyle };
