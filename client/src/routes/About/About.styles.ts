import styled, { css } from 'styled-components';
import { commonBorderRadius } from '../../common/values';

export const Root = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: ${commonBorderRadius}px;
  h2 {
    font-weight: 400;
  }
`;
export const Card = styled.div(
  ({ theme }) => css`
    margin-top: 7.5vh;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${commonBorderRadius}px;
    border: solid 1px;
    border-color: ${theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main};
    @media (max-width: 1440px) {
      margin-top: 12vh;
    }
  `
);

export const Wrapper = styled.div(
  () => css`
    width: 70%;
    overflow: hidden;
    padding: 15px;
  `
);

export const ChildDiv = styled.div`
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
`;
