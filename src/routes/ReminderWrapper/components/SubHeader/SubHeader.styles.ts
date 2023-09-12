import styled, { css } from 'styled-components';

export const Root = styled.div(
  ({ theme }) => css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 10vh;
    left: 0;
    width: 100vw;
    height: fit-content;
    background-color: ${theme.palette.common[`${theme.palette.mode === 'light' ? 'white' : 'black'}`]};
    border-bottom: solid 1px ${theme.palette.mode === 'light' ? '#bbbbbb' : '#434343'};
    align-items: end;
    justify-content: center;
    @media (max-width: 1440px) {
      height: calc(3rem + 1.5vh);
    }
  `
);
