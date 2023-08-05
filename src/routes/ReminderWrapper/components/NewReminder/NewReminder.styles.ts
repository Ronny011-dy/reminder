import styled, { css } from 'styled-components';

const Root = styled.div(
  ({ theme }) => css`
    margin-top: 20px;
    border: 3px dashed;
    border-radius: 15px;
    border-color: ${theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main};
    padding: 10px;

    input {
      outline: none;
      border: none;
      background-color: transparent;
      font-size: 1rem;
    }
  `
);

export { Root };
