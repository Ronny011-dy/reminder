import { IconButton } from '@mui/material';
import styled, { css } from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 35px;
  font-weight: bold;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
`;

const IconButtonStyled = styled(IconButton)(
  ({ theme }) => css`
    width: 2rem;
    height: 2rem;
    align-self: center;
    color: ${theme.palette.secondary.main} !important;
  `
);

export { Root, IconButtonStyled };
