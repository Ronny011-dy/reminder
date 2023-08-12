import styled, { css } from 'styled-components';

const Root = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  h2 {
    font-weight: 400;
  }
`;
const Card = styled.div(
  ({ theme }) => css`
    width: 60%;
    background-color: ${theme.palette.mode === 'dark'
      ? theme.palette.common.black
      : theme.palette.common.white};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border: solid 1px;
    border-color: ${theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main};
  `
);

const Wrapper = styled.div(
  ({ theme }) => css`
    width: 70%;
    overflow: hidden;
    padding: 15px;
  `
);

const ChildDiv = styled.div`
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
`;
export { Root, Card, Wrapper, ChildDiv };
