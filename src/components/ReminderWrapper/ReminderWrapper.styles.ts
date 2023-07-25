import styled from 'styled-components';

const Root = styled.div`
  min-height: 80vh;
  width: 75%;
  max-width: 1024px;
`;

const MainTitleWrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const MainTitleStyle = styled.h1`
  font-size: 35px;
  font-weight: bold;
`;

export { Root, MainTitleStyle, MainTitleWrapperStyle };
