import styled, { css } from 'styled-components';

export const Root = styled.div(
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
    background-color: transparent;
    div {
      display: flex;
      justify-content: end;
      width: 100%;
      max-width: 1440px;
      height: fit-content;
    }
    hr {
      align-self: baseline;
      position: absolute;
      right: 4%;
      width: 92%;
    }
  `
);
