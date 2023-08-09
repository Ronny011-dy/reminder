import styled, { css } from 'styled-components';

const Root = styled.div`
  /* CSS styles here */
`;

const DrawerWrapper = styled.div(
  ({ theme }) => css`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${theme.palette.mode === 'dark'
      ? theme.palette.common.black
      : theme.palette.common.black};
    border-left: solid 2px;
    border-color: ${theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main};
    padding: 25px;
  `
);

const InputStyled = styled.input`
  height: 3.5vh;
  width: 250px;
  background-color: whitesmoke;
  outline: none;
  border-radius: 5px;
  margin-bottom: 25px;
  border: none;
  font-weight: bold;
  color: rgb(30, 30, 30);
`;

export { Root, DrawerWrapper, InputStyled };
