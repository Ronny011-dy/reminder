import { Checkbox, ListItem } from '@mui/material';
import styled, { css } from 'styled-components';

const Root = styled.div`
  font-weight: bold;
`;

const CheckboxStyled = styled(Checkbox)(
  ({ theme }) => css`
    color: ${theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main} !important;
  `
);

const ListItemStyled = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { Root, ListItemStyled, CheckboxStyled };
