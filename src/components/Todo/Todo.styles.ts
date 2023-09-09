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

const parentBorderColor = (theme: Theme) => css`
  border-color: ${theme.palette.common[`${theme.palette.mode === 'light' ? 'black' : 'white'}`]};
`;

const childBorderColor = (theme: Theme) => css`
  border-color: ${theme.palette.mode === 'light' ? '#bbbbbb' : '#434343'};
`;

export const Root = styled.div``;

export const StyledFocusableDiv = styled.div``;

export const StyledListItem = styled(ListItem)<WrapperProps>(
  ({ $isChild, theme }) => css`
    width: 100%;
    max-width: 500px;
    border: solid 1px;
    ${!$isChild ? parentBorderColor(theme) : childBorderColor(theme)}
    border-radius: 15px;
    margin-bottom: 20px;
  `
);

export const StyledDiv = styled.div<StyledDivProps>(
  ({ orientation, align, justify }) => css`
    display: flex;
    flex-direction: ${orientation};
    ${align && alignedToCenter};
    ${justify && justifiedToCenter};
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
