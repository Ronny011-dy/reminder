import styled, { css } from 'styled-components';

export const Root = styled.div(
  ({ theme }) => css`
    position: absolute;
    display: flex;
    top: 8.5vh;
    left: 0;
    width: 100vw;
    height: calc(3.3rem + 1.5vh);
    background-color: ${theme.palette.primary[`${theme.palette.mode}`]};
    border-radius: 0px 0px 15px 15px;
    align-items: end;
    justify-content: center;
    padding-bottom: 0.5vh;
    @media (max-width: 1440px) {
      height: calc(3rem + 1.5vh);
    }
  `
);
