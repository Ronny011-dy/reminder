import styled, { css } from 'styled-components';

const Root = styled.div(
  ({ theme }) => css`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      text-align: center;
      padding: 50px;
      background-color: ${theme.palette.primary.main};
      border-radius: 15px;
    }
  `
);

const ImgStyled = styled.img`
  height: 50px;
  width: 50px;
  margin: 15px;
`;

const TickerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export { Root, ImgStyled, TickerStyled };
