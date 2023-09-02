import { ListItem } from '@mui/material';
import styled, { css } from 'styled-components';

interface StyledListItemProps {
  $noReminders?: boolean;
}

export const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledWrapper = styled.div``;

export const StyledListItem = styled(ListItem)<StyledListItemProps>(
  ({ theme, $noReminders }) => css`
    width: 100%;
    max-width: 1000px;
    min-width: ${$noReminders ? '500' : '0'}px;
    height: 108px;
    margin-bottom: 20px;
    border: 2px dashed;
    border-radius: 15px;
    border-color: ${theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main};
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
