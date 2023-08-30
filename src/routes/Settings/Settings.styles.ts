import styled, { css } from 'styled-components';

export const Root = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledDiv = styled.div(
  ({ theme }) => css`
    margin-top: 7.5vh;
    background-color: ${theme.palette.mode === 'dark' ? '#1e1e1e' : '#e5e5f6'};
    border: solid 1px;
    border-radius: 15px;
    border-color: ${theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light};
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 25px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    h2 {
      margin-top: 0;
    }
    hr {
      margin: 0;
      width: 250px;
      border-color: ${theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light};
    }
    h3 {
      align-self: center;
    }
    @media (max-width: 1440px) {
      margin-top: 12vh;
    }
  `
);
