import styled, { css } from 'styled-components';

const Root = styled.div(
  ({ theme }) => css`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: 32px 32px;
    background-position: 0 0, 16px 16px;
  `
);

export { Root };
