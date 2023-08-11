import styled from 'styled-components';

const Root = styled.div`
  text-align: center;
`;

const InputStyled = styled.input`
  outline: none;
  border: none;
  background: none;
  border-bottom: solid 1px grey;
`;

const ContentStyled = styled.div`
  height: 150px;
  width: 200px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: rgb(204, 0, 0);
    position: absolute;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 70px;
  }
`;

export { Root, InputStyled, ContentStyled };
