import styled, { css } from 'styled-components';
const Root = styled.div(
  ({ theme }) => css`
    background-color: ${theme.palette.mode === 'light' ? '#e7e7e7' : '#101010'};
    border-bottom: solid 1px ${theme.palette.mode === 'light' ? '#bbbbbb' : '#434343'};
    width: 100vw;
    display: flex;
    align-items: end;
    justify-content: center;
    padding-left: 10px;
    color: white;
    height: 10vh;
    z-index: 1;
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1440px;
      height: fit-content;
      padding-left: 10px;
      padding-right: 5px;
      padding-bottom: 5px;
    }
  `
);

const Title = styled.h1(
  ({ theme }) => css`
    color: ${theme.palette.mode === 'light' ? '#434343' : `${theme.palette.common.white}`};
    margin: 0 !important;
    transition: text-shadow 0.3s ease-in-out;
    &:hover {
      text-shadow: 0px 0px 10px #00000074;
    }
  `
);

export { Root, Title };
