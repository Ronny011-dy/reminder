import styled, { css } from 'styled-components';

const Root = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  h2 {
    font-weight: 400;
  }
`;
const Card = styled.div(
  ({ theme }) => css`
    margin-top: 7.5vh;
    width: 60%;
    background-color: ${theme.palette.mode === 'dark' ? '#1e1e1e' : '#e5e5f6'};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border: solid 1px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-color: ${theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main};
    @media (max-width: 1440px) {
      margin-top: 12vh;
    }
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
