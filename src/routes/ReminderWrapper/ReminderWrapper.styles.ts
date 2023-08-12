import styled from 'styled-components';

const Root = styled.div`
  max-width: 1440px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 80vh;
`;

const LeftMenu = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 3.5vh;
  height: 30vh;
  overflow-y: hidden;
  transition: overflow-y 0.3s ease-in-out;
  &:hover {
    overflow-y: scroll;
    padding-right: 20px;
  }
  @media (max-width: 1440px) {
    margin-top: 12vh;
    height: 47.5vh;
  }
`;

export { Root, LeftMenu };
