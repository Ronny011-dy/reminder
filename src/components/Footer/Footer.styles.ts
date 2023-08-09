import styled, { css } from 'styled-components';

const Root = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: center;
    position: fixed;
    bottom: 0;
    padding-bottom: 5px;
    padding-right: 10px;
    width: 100vw;
    height: 10vh;
    background-color: ${theme.palette.primary[`${theme.palette.mode}`]};
    border-radius: 15px 15px 0px 0px;
    color: white;
    div {
      display: flex;
      justify-content: end;
      width: 100%;
      max-width: 1440px;
      height: fit-content;
    }
  `
);

export { Root };
