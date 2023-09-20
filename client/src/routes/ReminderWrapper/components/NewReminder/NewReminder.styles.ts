import { ListItem, Theme } from '@mui/material';
import styled, { css } from 'styled-components';
import { commonBorderRadius } from '../../../../common/values';

interface StyledListItemProps {
  $noReminders?: boolean;
  $isChild?: boolean;
}

interface RootProps {
  shouldHide?: boolean;
}

const parentBorderColor = (theme: Theme) => css`
  border-color: ${theme.palette.common[`${theme.palette.mode === 'light' ? 'black' : 'white'}`]};
`;

const childBorderColor = (theme: Theme) => css`
  border-color: ${theme.palette.mode === 'light' ? '#bbbbbb' : '#434343'};
`;

export const Root = styled.div<RootProps>(
  ({ shouldHide }) => css`
    display: ${shouldHide ? 'none' : 'flex'};
    flex-direction: column;
  `
);

export const StyledWrapper = styled.div``;

export const StyledListItem = styled(ListItem)<StyledListItemProps>(
  ({ theme, $isChild }) => css`
    width: 500px !important;
    height: 108px;
    margin-bottom: 20px;
    border: 2px dashed;
    border-radius: ${commonBorderRadius}px;
    ${!$isChild ? parentBorderColor(theme) : childBorderColor(theme)}
    input {
      outline: none;
      border: none;
      background-color: transparent;
      font-size: 1rem;
      overflow-x: hidden;
      text-overflow: ellipsis;
      margin-left: 10px;
    }
    @media (max-width: 610px) {
      width: 80% !important;
    }
  `
);
