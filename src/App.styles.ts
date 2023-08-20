import styled, { css } from 'styled-components';

const lightMode = () => css`
  background-color: whitesmoke;
  background-image: radial-gradient(#444df74a 0.8px, transparent 0.8px), radial-gradient(#444df74a 0.8px, #e5e5f7 0.8px);
`;
const darkMode = () => css`
  background-color: rgb(30, 30, 30);
  background-image: radial-gradient(#444df74a 0.8px, transparent 0.8px),
    radial-gradient(#444df74a 0.8px, rgb(30, 30, 30) 0.8px);
`;

const Root = styled.div(
  ({ theme }) => css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${theme.palette.mode === 'dark' ? darkMode : lightMode};
    background-size: 32px 32px;
    background-position: 0 0, 16px 16px;
    /* background-image: radial-gradient(#444df74a 0.8px, transparent 0.8px),
      radial-gradient(#444df74a 0.8px, #e5e5f7 0.8px); */
  `
);

export { Root };
