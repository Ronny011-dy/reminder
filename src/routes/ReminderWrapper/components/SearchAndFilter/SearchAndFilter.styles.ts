import { Drawer } from '@mui/material';
import styled, { css } from 'styled-components';

const lightMode = () => css`
  background-color: whitesmoke;
  background-image: radial-gradient(
      rgba(68, 77, 247, 0.175) 0.8px,
      transparent 0.8px
    ),
    radial-gradient(rgba(68, 77, 247, 0.207) 0.8px, #e5e5f7 0.8px);
`;
const darkMode = () => css`
  background-color: rgb(30, 30, 30);
  background-image: radial-gradient(#444df74a 0.8px, transparent 0.8px),
    radial-gradient(#444df74a 0.8px, rgb(30, 30, 30) 0.8px);
`;

const Root = styled.div``;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-root {
    .MuiBackdrop-root {
      background-color: transparent;
    }
  }
`;

const DrawerWrapper = styled.div(
  ({ theme }) => css`
    height: 100%;
    width: 100%;
    background-size: 32px 32px;
    background-position: 0 0, 16px 16px;
    display: flex;
    flex-direction: column;
    ${theme.palette.mode === 'dark' ? darkMode : lightMode};
    border-left: solid 2px;
    border-color: ${theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main};
    padding: 25px;
  `
);

const InputStyled = styled.input`
  padding: 15px;
  height: fit-content;
  width: 300px;
  background-color: whitesmoke;
  outline: none;
  border-radius: 3px;
  margin-bottom: 25px;
  border: solid 1px rgba(30, 30, 30, 0.263);
  font-weight: bold;
  color: rgb(30, 30, 30);
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchIconButton = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
`;

export {
  Root,
  StyledDrawer,
  DrawerWrapper,
  InputStyled,
  SearchWrapper,
  SearchIconButton,
};
