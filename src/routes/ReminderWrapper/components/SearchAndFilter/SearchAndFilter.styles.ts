import { Drawer } from '@mui/material';
import styled, { css } from 'styled-components';

export const Root = styled.div``;

export const StyledDrawer = styled(Drawer)`
  .MuiDrawer-root {
    .MuiBackdrop-root {
      background-color: transparent;
    }
  }
`;

export const DrawerWrapper = styled.div(
  ({ theme }) => css`
    height: 100%;
    width: 100%;
    background-size: 32px 32px;
    background-position: 0 0, 16px 16px;
    display: flex;
    flex-direction: column;
    border-left: solid 2px;
    border-color: ${theme.palette.mode === 'light' ? '#bbbbbb' : '#434343'};
    padding: 25px;
  `
);

export const InputStyled = styled.input`
  padding: 15px;
  height: fit-content;
  width: 300px;
  outline: none;
  border-radius: 3px;
  margin-bottom: 25px;
  border: solid 1px rgba(30, 30, 30, 0.263);
  font-weight: bold;
  color: rgb(30, 30, 30);
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SearchIconButton = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
`;
