import styled, { css } from 'styled-components';
import { commonBorderRadius } from '../../common/values';

export const Root = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledDiv = styled.div(
  ({ theme }) => css`
    margin-top: 7.5vh;
    border: solid 1px;
    border-radius: ${commonBorderRadius}px;
    border-color: ${theme.palette.common[`${theme.palette.mode === 'light' ? 'black' : 'white'}`]};
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 25px;
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
