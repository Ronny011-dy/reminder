import styled, { css } from 'styled-components';
import { Checkbox, ListItem, ListItemButton } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Tags } from './components/Tags/Tags';

interface WrapperProps {
  $isChild?: boolean;
  $display?: boolean;
  theme?: Theme;
}

interface StyledListItemTextProps {
  secondary?: boolean;
  //using transient prop as the done property by itself is not registered as boolean
  $done?: boolean;
  selected?: boolean;
}

interface StyledDivProps {
  orientation: 'row' | 'column';
  align?: boolean;
  justify?: boolean;
  paddingLeft?: boolean;
}

interface StyledTagsWrapperProps {
  isSelected: boolean;
}

const alignedToCenter = css`
  align-items: center;
`;

const justifiedToCenter = css`
  justify-content: center;
`;

export const Root = styled.div``;

export const StyledListItem = styled(ListItem)<WrapperProps>(
  ({ $isChild, theme }) => css`
    width: 100%;
    max-width: 1000px;
    background-color: ${theme.palette.mode === 'dark' ? '#1e1e1e' : '#e5e5f6'};
    /* margin-top: ${!$isChild ? '20px' : '0'}; */
    border: solid 1px;
    border-color: ${theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main};
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  `
);

export const StyledDiv = styled.div<StyledDivProps>(
  ({ orientation, align, justify, paddingLeft }) => css`
    display: flex;
    flex-direction: ${orientation};
    ${align && alignedToCenter};
    ${justify && justifiedToCenter};
    /* padding-left: ${paddingLeft ? '0' : '0'}px; */
    /* @media (max-width: 1440px) {
      padding-left: ${paddingLeft ? '20' : '0'}px;
    } */
  `
);

export const ChildReminder = styled.div`
  background-color: rgb(23, 46, 69);
  border: solid 2px rgba(255, 255, 255, 0.486);
  border-radius: 15px;
  margin-left: 50px;
  margin-right: 25px;
`;

export const Padding = styled.div`
  height: 15px;
`;

export const StyledListItemText = styled.div<StyledListItemTextProps>(
  ({ $done, selected, secondary }) => css`
    text-decoration: ${$done ? 'line-through' : 'none'};
    opacity: ${$done || secondary ? '50%' : '100%'};
    margin-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(30vw - ${selected ? '2' : '0'}vw);
    max-width: 50ch;
    @media (max-width: 610px) {
      width: 20vw;
    }
  `
);

export const StyledListItemButton = styled(ListItemButton)(
  ({ theme }) => css`
    border-radius: 15px !important;
    &:hover {
      color: ${theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main};
      background-color: transparent !important;
    }
    &:hover ${StyledTagsWrapper} {
      opacity: 100%;
    }
  `
);

export const CheckboxStyled = styled(Checkbox)(
  ({ theme }) => css`
    margin-left: 10px !important;
    color: ${theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main} !important;
  `
);

export const StyledTagsWrapper = styled.div<StyledTagsWrapperProps>(
  ({ isSelected }) => css`
    opacity: ${isSelected ? '100' : '0'}%;
  `
);
