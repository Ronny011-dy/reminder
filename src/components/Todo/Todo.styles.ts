import styled, { css } from 'styled-components';
import { Checkbox, ListItemButton } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { ListItemText, Stack } from '@mui/material';

interface WrapperProps {
  isChild?: boolean;
  //using transient prop as the done property by itself is not registered as boolean
  $done?: boolean;
  theme?: Theme;
}

const Root = styled.div<WrapperProps>(
  ({ isChild, theme }) => css`
    background-color: ${theme.palette.mode === 'dark' ? '#1e1e1e' : '#e5e5f6'};
    overflow-x: auto;
    margin-top: ${!isChild ? '20px' : '0'};
    border: solid 1px;
    border-color: ${theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main};
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  `
);

const ChildReminder = styled.div`
  background-color: rgb(23, 46, 69);
  border: solid 2px rgba(255, 255, 255, 0.486);
  border-radius: 15px;
  margin-left: 50px;
  margin-right: 25px;
`;

const AlignedStack = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Padding = styled.div`
  height: 15px;
`;

const ListItemTextStyled = styled(ListItemText)<WrapperProps>(
  ({ $done }) => css`
    text-decoration: ${$done ? 'line-through' : 'none'};
    opacity: ${$done ? '50%' : '100%'};
  `
);

const ListItemButtonStyled = styled(ListItemButton)(
  ({ theme }) => css`
    padding: 0;
    :hover {
      color: ${theme.palette.mode === 'dark'
        ? theme.palette.primary.light
        : theme.palette.primary.main};
    }
  `
);

const CheckboxStyled = styled(Checkbox)(
  ({ theme }) => css`
    color: ${theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main} !important;
  `
);

export {
  Root,
  ChildReminder,
  AlignedStack,
  Padding,
  ListItemTextStyled,
  ListItemButtonStyled,
  CheckboxStyled,
};
