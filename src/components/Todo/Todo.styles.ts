import styled, { css } from 'styled-components';
import { Checkbox, ListItem, ListItemButton } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface WrapperProps {
  $isChild?: boolean;
  $display?: boolean;
  theme?: Theme;
}

interface StyledListItemTextProps {
  //using transient prop as the done property by itself is not registered as boolean
  $done?: boolean;
  isSelected?: boolean;
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
    border: solid 1px;
    border-color: ${theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main};
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    margin-bottom: 20px;
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

export const StyledListItemText = styled.div<StyledListItemTextProps>(
  ({ $done, isSelected }) => css`
    text-decoration: ${$done ? 'line-through' : 'none'};
    margin-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(30vw - ${isSelected ? '2' : '0'}vw);
    max-width: 50ch;
    opacity: ${isSelected ? '30' : '0'}%;
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
      visibility: visible;
    }
    &:hover ${StyledListItemText} {
      opacity: 30%;
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
    visibility: ${isSelected ? 'visible' : 'hidden'};
  `
);
